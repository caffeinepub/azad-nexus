import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  public type Inquiry = {
    id : Nat;
    name : Text;
    company : Text;
    country : Text;
    quantityMT : Text;
    riceCategory : Text;
    email : Text;
    phone : Text;
    message : Text;
    status : InquiryStatus;
    submittedAt : Int;
  };

  public type InquiryStatus = {
    #pending;
    #resolved;
  };

  var inquiries : [Inquiry] = [];
  var nextId = 0;
  let adminUsername = "Azadnexus.global@gmail.com";
  let adminPassword = "Karusu_7";
  var adminAccessKey : ?Text = null;

  func requireValidKey(key : Text) {
    switch (adminAccessKey) {
      case (null) { Runtime.trap("Unauthorized: No admin access key set") };
      case (?storedKey) {
        if (key != storedKey) {
          Runtime.trap("Unauthorized: Invalid admin access key");
        };
      };
    };
  };

  public shared func submitInquiry(
    name : Text,
    company : Text,
    country : Text,
    quantityMT : Text,
    riceCategory : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : async () {
    let inquiry : Inquiry = {
      id = nextId;
      name;
      company;
      country;
      quantityMT;
      riceCategory;
      email;
      phone;
      message;
      status = #pending;
      submittedAt = Time.now();
    };

    inquiries := inquiries.concat([inquiry]);
    nextId += 1;
  };

  func generateKey() : Text {
    let timestamp = Time.now().toText();
    let random = (Time.now() / 1000 % 1000000).toText();
    "key_" # timestamp # random;
  };

  public shared ({ caller }) func validateAdmin(username : Text, password : Text) : async ?Text {
    if (username == adminUsername and password == adminPassword) {
      let key = generateKey();
      adminAccessKey := ?key;
      ?key;
    } else {
      null;
    };
  };

  public shared func getInquiries(key : Text) : async [Inquiry] {
    requireValidKey(key);
    let sorted = inquiries.sort(
      func(a : Inquiry, b : Inquiry) : Order.Order {
        if (b.submittedAt > a.submittedAt) { #less }
        else if (b.submittedAt < a.submittedAt) { #greater }
        else { #equal };
      }
    );
    sorted;
  };

  public shared func markResolved(key : Text, id : Nat) : async () {
    requireValidKey(key);
    let inquiryIndex = inquiries.findIndex(func(inq : Inquiry) : Bool { inq.id == id });

    switch (inquiryIndex) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?index) {
        let updatedInquiry : Inquiry = {
          inquiries[index] with status = #resolved
        };
        let inquiriesList = inquiries.toVarArray<Inquiry>();
        inquiriesList[index] := updatedInquiry;
        inquiries := inquiriesList.toArray();
      };
    };
  };

  public shared func deleteInquiry(key : Text, id : Nat) : async () {
    requireValidKey(key);
    let inquiryIndex = inquiries.findIndex(func(inq : Inquiry) : Bool { inq.id == id });

    switch (inquiryIndex) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?index) {
        let before = inquiries.sliceToArray(0, index);
        let after = inquiries.sliceToArray(index + 1, inquiries.size());
        inquiries := before.concat(after);
      };
    };
  };
};
