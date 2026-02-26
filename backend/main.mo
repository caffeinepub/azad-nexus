import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";
import MixinStorage "blob-storage/Mixin";

(with migration = Migration.run)
actor {
  // ── Authorization ────────────────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Storage ──────────────────────────────────────────────────────────────────
  include MixinStorage();

  // ── Admin Credentials ────────────────────────────────────────────────────────
  let adminUsername = "azadnexus.global@gmail.com";

  // These fields are not really used as authentication is handled by component authorization.
  // Passwords are not needed in the backend as authorized users have already entered correct passwords.
  // For additional off-chain password protection, implement encryption in the frontend.
  let adminPasswordHash = "bdc7e2d6eec6a5d3ff1fa5e3a57b4531393aa3ac5d416ab42e873d46c255b";

  // ── User Profile ─────────────────────────────────────────────────────────────
  public type UserProfile = {
    name : Text;
    // Add other user metadata here as needed (email, preferences, etc.)
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ── Inquiry Types ────────────────────────────────────────────────────────────
  public type Inquiry = {
    id : Nat;
    name : Text;
    company : Text;
    country : Text;
    riceVariety : Text;
    quantityMT : Float;
    message : Text;
    timestamp : Int;
  };

  // ── Blog Post Types ──────────────────────────────────────────────────────────
  public type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    imageDescription : Text;
    publishedDate : Text;
    timestamp : Int;
  };

  // ── Service Types ─────────────────────────────────────────────────────────────
  public type Service = {
    id : Nat;
    name : Text;
    description : Text;
    details : Text;
  };

  // ── Inquiry Storage ──────────────────────────────────────────────────────────
  var nextInquiryId : Nat = 0;
  let inquiries = Map.empty<Nat, Inquiry>();

  // ── Blog Post Storage ────────────────────────────────────────────────────────
  var nextBlogPostId : Nat = 0;
  let blogPosts = Map.empty<Nat, BlogPost>();

  // ── Service Storage ──────────────────────────────────────────────────────────
  var nextServiceId : Nat = 0;
  let services = Map.empty<Nat, Service>();

  // ── Validation Helpers ───────────────────────────────────────────────────────
  func validateInquiry(
    name : Text,
    company : Text,
    country : Text,
    riceVariety : Text,
    quantityMT : Float,
    message : Text,
  ) {
    if (name.size() < 2) {
      Runtime.trap("Validation error: Name must have at least 2 characters");
    };
    if (company.size() < 2) {
      Runtime.trap("Validation error: Company must have at least 2 characters");
    };
    if (country.size() < 2) {
      Runtime.trap("Validation error: Country must have at least 2 characters");
    };
    if (riceVariety.size() < 2) {
      Runtime.trap("Validation error: Rice variety must have at least 2 characters");
    };
    if (quantityMT <= 0) {
      Runtime.trap("Validation error: Quantity must be greater than 0");
    };
    if (message.size() < 5) {
      Runtime.trap("Validation error: Message must have at least 5 characters");
    };
  };

  // ── Admin Authentication ─────────────────────────────────────────────────────
  /// Attempt admin login. On success, assigns the #admin role to the caller's principal.
  /// The caller must not be anonymous (anonymous principals cannot hold roles).
  public shared ({ caller }) func adminLogin(username : Text, password : Text) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot log in as admin");
    };
    if (username == adminUsername and password == adminPasswordHash) {
      AccessControl.assignRole(accessControlState, caller, caller, #admin);
      true;
    } else {
      false;
    };
  };

  /// Revoke admin role from the caller (logout).
  public shared ({ caller }) func adminLogout() : async () {
    if (caller.isAnonymous()) {
      return;
    };
    // Demote the caller back to #guest role
    AccessControl.assignRole(accessControlState, caller, caller, #guest);
  };

  /// Check whether the caller currently holds the admin role.
  public query ({ caller }) func isAdminLoggedIn() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // ── Public Functions ─────────────────────────────────────────────────────────

  /// Submit a new inquiry. Open to any caller (including guests).
  public shared ({ caller }) func submitInquiry(
    name : Text,
    company : Text,
    country : Text,
    riceVariety : Text,
    quantityMT : Float,
    message : Text,
  ) : async Nat {
    validateInquiry(name, company, country, riceVariety, quantityMT, message);

    let inquiry : Inquiry = {
      id = nextInquiryId;
      name;
      company;
      country;
      riceVariety;
      quantityMT;
      message;
      timestamp = Time.now();
    };

    inquiries.add(nextInquiryId, inquiry);
    let assignedId = nextInquiryId;
    nextInquiryId += 1;
    assignedId;
  };

  /// Retrieve all inquiries. Admin-only.
  public query ({ caller }) func getInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.values().toArray();
  };

  /// Clear all inquiries. Admin-only.
  public shared ({ caller }) func clearInquiries() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can clear inquiries");
    };
    inquiries.clear();
    nextInquiryId := 0;
  };

  /// Delete an individual inquiry by ID. Admin-only.
  public shared ({ caller }) func deleteInquiry(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };
    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (_) {
        inquiries.remove(id);
      };
    };
  };

  // ── Blog Post Functions ──────────────────────────────────────────────────────

  /// Create a new blog post. Admin-only.
  public shared ({ caller }) func createBlogPost(
    title : Text,
    content : Text,
    imageDescription : Text,
    publishedDate : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };
    if (title.size() < 1) {
      Runtime.trap("Validation error: Title must not be empty");
    };
    if (content.size() < 1) {
      Runtime.trap("Validation error: Content must not be empty");
    };

    let post : BlogPost = {
      id = nextBlogPostId;
      title;
      content;
      imageDescription;
      publishedDate;
      timestamp = Time.now();
    };

    blogPosts.add(nextBlogPostId, post);
    let assignedId = nextBlogPostId;
    nextBlogPostId += 1;
    assignedId;
  };

  /// Edit an existing blog post. Admin-only.
  public shared ({ caller }) func editBlogPost(
    id : Nat,
    title : Text,
    content : Text,
    imageDescription : Text,
    publishedDate : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit blog posts");
    };
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?existing) {
        let updated : BlogPost = {
          id = existing.id;
          title;
          content;
          imageDescription;
          publishedDate;
          timestamp = existing.timestamp;
        };
        blogPosts.add(id, updated);
      };
    };
  };

  /// Delete a blog post. Admin-only.
  public shared ({ caller }) func deleteBlogPost(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (_) {
        blogPosts.remove(id);
      };
    };
  };

  /// Retrieve all published blog posts. Public.
  public query func getBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  /// Retrieve a single blog post by ID. Public.
  public query func getBlogPost(id : Nat) : async ?BlogPost {
    blogPosts.get(id);
  };

  // ── Service Functions ────────────────────────────────────────────────────────

  /// Create a new service listing. Admin-only.
  public shared ({ caller }) func createService(
    name : Text,
    description : Text,
    details : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create services");
    };
    if (name.size() < 1) {
      Runtime.trap("Validation error: Service name must not be empty");
    };

    let service : Service = {
      id = nextServiceId;
      name;
      description;
      details;
    };

    services.add(nextServiceId, service);
    let assignedId = nextServiceId;
    nextServiceId += 1;
    assignedId;
  };

  /// Edit an existing service listing. Admin-only.
  public shared ({ caller }) func editService(
    id : Nat,
    name : Text,
    description : Text,
    details : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit services");
    };
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (_) {
        let updated : Service = {
          id;
          name;
          description;
          details;
        };
        services.add(id, updated);
      };
    };
  };

  /// Delete a service listing. Admin-only.
  public shared ({ caller }) func deleteService(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (_) {
        services.remove(id);
      };
    };
  };

  /// Retrieve all services. Public.
  public query func getServices() : async [Service] {
    services.values().toArray();
  };

  /// Retrieve a single service by ID. Public.
  public query func getService(id : Nat) : async ?Service {
    services.get(id);
  };
};
