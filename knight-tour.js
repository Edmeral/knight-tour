function genLegalMoves(x, y, boardSize) {

  function isLegal(x, boardSize) {
    if (x >= 0 && x < boardSize)
      return true;

    return false;
  }

  var newMoves = [];
  var moveOffsets =  [[-1,-2], [-1,2], [-2,-1], [-2,1], [1,-2], [1,2], [2,-1], [2,1]];

  for (var i in moveOffsets) {
    var newX = x + moveOffsets[i][0];
    var newY = y + moveOffsets[i][1];

    if (isLegal(newX, boardSize) && isLegal(newY, boardSize))
      newMoves.push([newX, newY]);
  }

  return newMoves.map(function(coords) {
    return posToVertId(coords[0], coords[1], boardSize);
  });
}

function posToVertId(x, y, boardSize) {
  return  x + y * boardSize;
}

function dfs(vertex, boardSize) {
  vertex.visited = true;
  path.push(vertex.id);

  var done = false;

  if (path.length == boardSize * boardSize)
    return true;

  var neighbors = vertex.connectedTo;
  neighbors.sort(function (a, b) {
    return a.connectedTo.length - b.connectedTo.length;
  });

  for (var i = 0; i < neighbors.length && !done; i++) {
    if (!neighbors[i].visited)
      done = dfs(neighbors[i], boardSize);
  }

  if (!done) {
    path.pop();
    vertex.visited = false;
  }
  
  return done;
}

var Graph = require('./graph');

var boardSize = 8;

var chessBoard = new Graph();

for (var x = 0; x < boardSize; x++) {
  for (var y = 0; y < boardSize; y++) {
    var squareId = posToVertId(x, y, boardSize);
    var legalMoves = genLegalMoves(x, y, boardSize);

    for (var i in legalMoves)
      chessBoard.addEdge(squareId, legalMoves[i]);
  }
}

var path = [];

dfs(chessBoard.getVertex(process.argv[2]), boardSize);

process.stdout.write(path.toString());