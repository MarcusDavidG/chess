return (
    <Card className="bg-card">
      <div className="grid grid-cols-8 gap-0 border-2 border-border rounded-lg overflow-hidden shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((square, colIndex) => renderSquare(square, rowIndex, colIndex))
        )}
      </div>
      {promotionSquare && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-sm mx-4">
            <h3 className="text-xl font-semibold mb-4 text-center">Promote Pawn to:</h3>
            <div className="flex justify-center space-x-3">
              <Button onClick={() => handlePromotionSelect('q')} size="lg" className="text-2xl">♕</Button>
              <Button onClick={() => handlePromotionSelect('r')} size="lg" className="text-2xl">♖</Button>
              <Button onClick={() => handlePromotionSelect('b')} size="lg" className="text-2xl">♗</Button>
              <Button onClick={() => handlePromotionSelect('n')} size="lg" className="text-2xl">♘</Button>
            </div>
          </Card>
        </div>
      )}
      <div className="mt-4 text-center space-y-1">
        <p className={`text-sm font-medium ${isPlayerTurn ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
          {isPlayerTurn ? "Your turn" : "Opponent's turn"}
        </p>
        {chess.isCheckmate() && <p className="text-red-600 dark:text-red-400 font-bold">Checkmate!</p>}
        {chess.isStalemate() && <p className="text-yellow-600 dark:text-yellow-400 font-bold">Stalemate!</p>}
        {chess.inCheck() && <p className="text-orange-600 dark:text-orange-400 font-bold">Check!</p>}
      </div>
    </Card>
  )
