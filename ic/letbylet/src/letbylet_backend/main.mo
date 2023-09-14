import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Char "mo:base/Char";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Nft "./nft";

actor class LetByLetGame(initTarget : Text) {
  var targetWord = initTarget;
  var writtenWord = "";
  var lastWriter = Principal.fromText("aaaaa-aa");
  stable var gameId = 0;

  public query func getTarget() : async Text {
    return targetWord;
  };
  public query func getWritten() : async Text {
    return writtenWord;
  };
  public query func getWriter() : async Principal {
    return lastWriter;
  };
  public query func getID() : async Nat {
    return gameId;
  };
  public query func winner() : async ?Principal {
    if (finished()) {
      return ?lastWriter;
    } else {
      return null;
    };
  };

  public shared (msg) func append(ch : Text) : async () {
    assert (ch.size() == 1);
    assert (not finished());

    if (lastWriter != msg.caller) {
      lastWriter := msg.caller;
      writtenWord := "";
    };

    writtenWord #= ch;

    if (finished()) {
      let nft = actor ("be2us-64aaa-aaaaa-qaabq-cai") : Nft.NFT;
      let result = await nft.mintDip721(lastWriter, [{ purpose = #Rendered; key_val_data = [{ key = "description"; val = #TextContent("wrote " # targetWord # " let by let!") }]; data = "" }]);
      switch result {
        case (#Err(err)) {
          Debug.print("error minting nft: " # debug_show (err));
        };
        case _ {
          Debug.print("successfully minted nft");
        };
      };
    };
  };

  public shared func restart(newTarget : Text) : async () {
    assert (finished());

    targetWord := newTarget;
    writtenWord := "";
    lastWriter := Principal.fromText("aaaaa-aa");
    gameId += 1;
  };

  func finished() : Bool {
    return Text.contains(writtenWord, #text targetWord);
  };
};
