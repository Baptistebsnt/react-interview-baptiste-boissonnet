const ProgressBar = ({ likes, dislikes }) => {
  const total = likes + dislikes
  const progress = (likes / total) * 100

  return (
    <div className="flex flex-col justify-center">
      <div className="w-1/3 h-3 bg-red-300 rounded">
        <div
          className="h-3 bg-blue-400 rounded-md"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
