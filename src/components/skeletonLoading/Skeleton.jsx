import React from 'react'
import styles from './Skeleton.module.css'
export default function Skeleton({width,height,borderRadius=10}) {
  return (
    <div className={styles.skeleton} style={{width:width,height:height,borderRadius:borderRadius}}></div>
  )
}
