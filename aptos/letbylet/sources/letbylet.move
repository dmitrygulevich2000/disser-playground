module me::letbylet {
    use std::string;
    use std::signer;
    use mint_nft::create_nft_with_resource_account::mint_event_ticket;

    struct Game has key, copy {
        target_word: string::String,
        written_word: string::String,
        writer: address,
        game_id: u32,
    }

    public entry fun new_game(account: signer, target_word: string::String) acquires Game {
        if (!exists<Game>(@me)) {
            assert!(signer::address_of(&account) == @me, 1000);
            move_to<Game>(&account, Game{target_word: target_word, written_word: string::utf8(b""), writer: @std, game_id: 0});
            return
        };
        assert!(finished(), 100);

        let game = borrow_global_mut<Game>(@me);
        game.target_word = target_word;
        game.written_word = string::utf8(b"");
        game.writer = @std;
        game.game_id = game.game_id + 1;
    }

    #[view]
    public fun get_state(): Game acquires Game {
        *borrow_global<Game>(@me)
    }

    #[view]
    public fun finished(): bool acquires Game {
        let game = borrow_global<Game>(@me);
        string::index_of(&game.written_word, &game.target_word) != string::length(&game.written_word)
    }

    public entry fun append(account: signer, ch: string::String) acquires Game {
        assert!(string::length(&ch) == 1, 10);
        assert!(!finished(), 100);
        let game = borrow_global_mut<Game>(@me);
        if (signer::address_of(&account) != game.writer) {
            game.writer = signer::address_of(&account);
            game.written_word = string::utf8(b"");
        };
        
        string::append(&mut game.written_word, ch);
        if (finished()) {
            mint_event_ticket(&account);
        }
    }
}