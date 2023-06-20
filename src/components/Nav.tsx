import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Menu from './Menu'
import { visibleMenuState } from '../recoil/atom/navState'
import { useRecoilValue } from 'recoil'
import IMenu from '../models/interface/Imenu'

type Props = {
    leftButton?: React.JSX.Element
    title?: string
    rightButton?: React.JSX.Element
    menus?: IMenu[]
}

const Nav = ({ leftButton, title, rightButton, menus }: Props) => {

  const visibleMenu = useRecoilValue(visibleMenuState)

  return (
    <>
      <View
      className='flex-row w-full items-end pb-1.5 z-50 bg-slate-50'
      style={{
          height: 80,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
      }}
      >
          <View className='absolute flex-row w-full pb-1.5 px-5 items-center justify-between'>
              <View className=''>
                      {leftButton}
              </View>
              <View className=''>
                      {rightButton}
              </View>
          </View>
          <View className='mx-auto'>
              <Text className='text-center text-base text-purple-600'>{title}</Text>
          </View>
      </View>
      {visibleMenu && <Menu menus={menus}/>}
    </>
  )
}

export default Nav