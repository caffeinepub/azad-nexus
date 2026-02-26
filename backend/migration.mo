import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type Inquiry = {
    id : Nat;
    name : Text;
    company : Text;
    country : Text;
    riceVariety : Text;
    quantityMT : Float;
    message : Text;
    timestamp : Int;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    imageDescription : Text;
    publishedDate : Text;
    timestamp : Int;
  };

  type Service = {
    id : Nat;
    name : Text;
    description : Text;
    details : Text;
  };

  type OldActor = {
    inquiries : Map.Map<Nat, Inquiry>;
    nextId : Nat;
  };

  type NewActor = {
    inquiries : Map.Map<Nat, Inquiry>;
    nextInquiryId : Nat;
    blogPosts : Map.Map<Nat, BlogPost>;
    nextBlogPostId : Nat;
    services : Map.Map<Nat, Service>;
    nextServiceId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      inquiries = old.inquiries;
      nextInquiryId = old.nextId;
      blogPosts = Map.empty<Nat, BlogPost>();
      nextBlogPostId = 0;
      services = Map.empty<Nat, Service>();
      nextServiceId = 0;
    };
  };
};
