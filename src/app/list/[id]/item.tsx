'use client'

export default function Item() {
  const handleClick = () => {
    alert('you clicked me')
  }
  return (
    // <div>
    <div onClick={handleClick}>
      <h2>This clickeable an item</h2>
    </div>
  )
}
