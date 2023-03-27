

export function useStringHasher() {
  function hash(s: string): number {
    let h = 0
    let i = 0
    const l = s.length

    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0
    return Math.abs(h)
  }

  return { hash }
}

