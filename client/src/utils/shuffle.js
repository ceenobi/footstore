const getRecommendations = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, num)
}

export default function shuffleShow(arr, num) {
  return getRecommendations(arr, num)
}
