import React from 'react'
import process from 'process'

export const grid = {
  // Only Squares.
  rows: Number(process.env.PWA_ROWS) || 10,
  cols: Number(process.env.PWA_COLS) || 10,
}
