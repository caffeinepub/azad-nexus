import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // ── Authorization ────────────────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Admin Credentials ────────────────────────────────────────────────────────
  let adminUsername = "azadnexus.global@gmail.com";
  let adminPassword = "Karusu_7";

  // ── Authentication ───────────────────────────────────────────────────────────
  public shared ({ caller }) func authenticateAdmin(username : Text, password : Text) : async Bool {
    if (username == adminUsername and password == adminPassword) {
      true;
    } else {
      Runtime.trap("Invalid credentials");
    };
  };

  // ── User Profiles ────────────────────────────────────────────────────────────
  public type UserProfile = {
    name : Text;
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

  // ── Inquiry Storage ──────────────────────────────────────────────────────────
  var nextId : Nat = 0;
  let inquiries = Map.empty<Nat, Inquiry>();

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
      id = nextId;
      name;
      company;
      country;
      riceVariety;
      quantityMT;
      message;
      timestamp = Time.now();
    };

    inquiries.add(nextId, inquiry);
    let assignedId = nextId;
    nextId += 1;
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
    nextId := 0;
  };
};
