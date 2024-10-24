import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import axioVideo from '../store/axioVideo';


async function fetchSidebarItems() {
  try {
    const response = await axioVideo.get('/descs');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

const getLevelKeys = (items1: VideoDescResponse[]) => {
  const key: Record<string, number> = {};
  const func = (items2: VideoDescResponse[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

interface SidebarProps {
  onClick: Dispatch<SetStateAction<VideoInfo>>;
}

export interface VideoInfo {
  bucket_name: string;
  object_name: string;
}

interface VideoDescResponse {
  key: number;
  label: string;
  chapter?: number;
  object_name?: string;
  children?: VideoDescResponse[];
}

const Sidebar = ({ onClick }: SidebarProps) => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['1']);
  const [items, setItems] = useState<VideoDescResponse[]>([]);

  const levelKeys = getLevelKeys(items as VideoDescResponse[]);

  useEffect(() => {
    fetchSidebarItems().then(resolvedData => {
      setItems(resolvedData);
    });
  }, []);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const onSelect: MenuProps['onSelect'] = (current) => {
    const bucket_name = "chapter" + current.key.split('_')[0];
    const bucket_items = items.find(c => c.key === parseInt(current.key.split('_')[0]));
    let object_name = ''
    if (bucket_items !== undefined) {
      object_name = bucket_items['children']?.[parseInt(current.key.split('_')[1])]?.['object_name'] ?? '';
    } 
    const info: VideoInfo = {
      'bucket_name': bucket_name,
      'object_name': object_name,
    }
    onClick(info);
  };


  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1_0']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      style={{ width: 256 }}
      items={items}
    />
  )
};

export default Sidebar;