import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  shorthands,
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}