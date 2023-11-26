/* istanbul ignore file */

// Main exports.

// avatar exports.
export {
  avatarGenKey,
  generateS5Avatar,
} from "./utils/avatar";

// avatar type exports.
export type {
  S5AvatarOptions
} from "./utils/avatar";

// gun-pk-auth exports.
export {
  genDeterministicKeyPair,
  genDeterministicSEAPair,
  gunAuth,
} from "./utils/gun-pk-auth";

