import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type UserProfile = {
    name : Text;
    email : Text;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    adminHashedPassword : Text;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    { userProfiles = old.userProfiles };
  };
};
