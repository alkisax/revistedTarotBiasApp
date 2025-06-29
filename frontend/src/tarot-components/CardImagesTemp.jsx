// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const TarotCard = ({ position, cardName, mapCardToImage }) => (
  <div className="col-3 text-center">
    <h5>{position} Card</h5>
    <img
      src={mapCardToImage(cardName)}  // Pass the card name to mapCardToImage
      alt={`Card ${position}`}
      className="img-fluid rounded"
    />
    <p>{cardName}</p> {/* Optional: show card name below */}
  </div>
);

const CardImages = ({ drawnCards, mapCardToImage }) => {
  if (!drawnCards || drawnCards.length < 3) {
    return <p>Error: Not enough cards drawn.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Drawn Tarot Cards</h2>
      <div className="row justify-content-center">
        <TarotCard position="First" cardName={drawnCards[0]} mapCardToImage={mapCardToImage} />
        <TarotCard position="Second" cardName={drawnCards[1]} mapCardToImage={mapCardToImage} />
        <TarotCard position="Third" cardName={drawnCards[2]} mapCardToImage={mapCardToImage} />
      </div>
    </div>
  );
};

export default CardImages;
