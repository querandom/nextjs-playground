'use client'

export default function ClientItem() {
  const handleClick = () => {
    alert('you clicked me :)')
  }

  return (
    <div onClick={handleClick}>
      <h2>This is a Client Component. Click Me</h2>
    </div>
  )
}
