import {  genDeterministicSEAPair } from './gun-pk-auth';
import { gunAvatar } from 'gun-avatar'

/**
 * Represents options for an S5 avatar.
 * @param size - The size of the avatar.
 * @param round - Whether the avatar should have rounded corners.
 * @param dark - Whether the avatar should have a dark theme.
 * @param reflect - Whether the avatar should have a reflective effect.
 * @param draw - The drawing style for the avatar.
 */
export type S5AvatarOptions = {
  size?: number;
  round?: boolean;
  dark?: boolean;
  reflect?: boolean;
  draw?: string;
};

/**
 * Generate an avatar key in SEA format based on a public key.
 * @param publicKey The public key used for generating the avatar key.
 * @returns A Promise that resolves to the generated avatar key in SEA format.
 */
export const avatarGenKey = async (publicKey: string): Promise<string> => {
  // Generate the same key in SEA format
  const seaPair = genDeterministicSEAPair(publicKey);
  return seaPair.pub;
};

/**
 * Generates an S5 avatar based on a public key and avatar options.
 * @param publicKey - The public key as a string.
 * @param avatarOptions - Options for the avatar.
 * @returns A promise resolving to an object with the avatar and its image source.
 */
export async function generateS5Avatar(
  publicKey: string,
  avatarOptions: S5AvatarOptions,
): Promise<{ avatar: string }> {
  const avatarKey = await avatarGenKey(publicKey);

  const selectedDraw: 'circles' | 'squares' | undefined =
    avatarOptions.draw === 'circles' || avatarOptions.draw === 'squares'
      ? avatarOptions.draw
      : undefined;

  const S5Avatar = await gunAvatar({
    pub: avatarKey,
    size: avatarOptions.size,
    dark: avatarOptions.dark,
    reflect: avatarOptions.reflect,
    draw: selectedDraw,
  });
 
  if (document.readyState !== 'complete') await new Promise(r => setTimeout(r, 10));

  const existingImage = document.getElementById('avatar');
  const newS5Avatar = Object.assign(document.createElement('img'), { id: 'S5Avatar', src: S5Avatar });
  if (avatarOptions.round) newS5Avatar.style.borderRadius = '100%';

  if (existingImage instanceof HTMLImageElement) {
    newS5Avatar.addEventListener('load', () => {
      const parentNode = existingImage.parentNode;
      if (parentNode) {
        parentNode.insertBefore(newS5Avatar, existingImage);
        existingImage.remove();
      }
    });
  }

  return { avatar: S5Avatar };
}

