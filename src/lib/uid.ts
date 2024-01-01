export const userId = () => {
  if (!localStorage.getItem('uid')) {
    localStorage.setItem(
      'uid',
      '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
      ),
    )
  }
  return localStorage.getItem('uid') as string
}
