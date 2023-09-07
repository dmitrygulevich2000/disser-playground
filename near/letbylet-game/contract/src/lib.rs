use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, ext_contract, log, near_bindgen, require, PanicOnDefault};
use near_sdk::{AccountId, Promise};

use near_contract_standards::non_fungible_token::metadata::TokenMetadata;
use near_contract_standards::non_fungible_token::{Token, TokenId};

const APPEND_FEE: near_sdk::Balance = 10_000_000_000_000_000_000_000; // 0.01 yN

const NFT_ACCOUNT: &str = "nft.hello.dgulevich.testnet";

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize, PanicOnDefault)]
pub struct GameContract {
    recentWriter: AccountId,
    writtenWord: String,
    targetWord: String,
    gameNumber: u32,
}

#[ext_contract(ext_nft_minter)]
pub trait ExtNFTMinter {
    fn nft_mint(
        &mut self,
        token_id: TokenId,
        receiver_id: AccountId,
        token_metadata: TokenMetadata,
    ) -> Token;
}

#[near_bindgen]
impl GameContract {
    #[init]
    pub fn new(target: String) -> Self {
        Self {
            recentWriter: near_sdk::env::signer_account_id(),
            targetWord: target,
            writtenWord: "".to_string(),
            gameNumber: 0,
        }
    }

    #[payable]
    pub fn append(&mut self, symbol: String) {
        require!(!self.game_ended(), "game ended");
        require!(symbol.chars().count() == 1, "can only append 1 symbol");
        require!(
            near_sdk::env::attached_deposit() == APPEND_FEE,
            format!(
                "required fee {} Near",
                APPEND_FEE as f32 / near_sdk::ONE_NEAR as f32
            )
        );

        log!(
            "appending {}, game balance is {}",
            &symbol,
            near_sdk::env::account_balance()
        );
        if near_sdk::env::signer_account_id() == self.recentWriter {
            self.writtenWord += &symbol;
        } else {
            self.writtenWord = symbol;
            self.recentWriter = near_sdk::env::signer_account_id();
        };

        if let Some(winner) = self.winner() {
            ext_nft_minter::ext(NFT_ACCOUNT.parse().unwrap())
                .with_attached_deposit(APPEND_FEE)
                .nft_mint(
                    format!("letbylet winner#{}", self.gameNumber),
                    winner,
                    TokenMetadata {
                        title: Some(format!("letbylet {}", self.targetWord)),
                        description: Some(format!(
                            "wrote \"{}\" letter by letter",
                            self.targetWord
                        )),
                        media: None,
                        media_hash: None,
                        copies: None,
                        issued_at: None,
                        expires_at: None,
                        starts_at: None,
                        updated_at: None,
                        extra: None,
                        reference: None,
                        reference_hash: None,
                    },
                )
                .then(Self::ext(env::current_account_id()).callback_log_award())
                .as_return();
        };
    }

    pub fn winner(&self) -> Option<AccountId> {
        if self.game_ended() {
            Some(self.recentWriter.clone())
        } else {
            None
        }
    }

    pub fn written_word(&self) -> &str {
        &self.writtenWord
    }

    pub fn target_word(&self) -> &str {
        &self.targetWord
    }

    pub fn start_game(&mut self, target: String) {
        require!(self.game_ended(), "cannot restart game");
        self.targetWord = target;
        self.writtenWord = "".to_string();
        self.recentWriter = near_sdk::env::signer_account_id();
        self.gameNumber += 1;
    }

    fn game_ended(&self) -> bool {
        self.writtenWord.contains(&self.targetWord)
    }

    #[private]
    pub fn callback_log_award(
        &mut self,
        #[callback_result] res: Result<Token, near_sdk::PromiseError>,
    ) {
        if let Ok(tok) = res {
            log!(format!(
                "{} awarded with {}, game balance is {}",
                self.winner().unwrap(),
                tok.token_id,
                env::account_balance()
            ));
        } else {
            self.gameNumber += 1;
            env::panic_str("failed to mint winner nft");
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
}
