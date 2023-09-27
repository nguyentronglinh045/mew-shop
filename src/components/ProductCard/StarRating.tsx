const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          style={{
            cursor: 'pointer',
            color: value <= rating ? '#d80000' : 'gray'
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  )
}

export default StarRating
