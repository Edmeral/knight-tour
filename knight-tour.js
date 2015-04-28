function genLegalMoves(x, y, boardSize) {

  function isLegal(x, boardSize) {
    if (x >= 0 && x < boardSize)
      return true;

    return false;
  }

  newMoves = [];
  moveOffsets =  [[-1,-2], [-1,2], [-2,-1], [-2,1], [1,-2], [1,2], [2,-1], [2,1]];

  for (var i in moveOffsets) {
    var newX = x + moveOffsets[i][0];
    var newY = y + moveOffsets[i][1];

    if (isLegal(newX, boardSize) && isLegal(newY, boardSize))
      newMoves.push([newX, newY]);
  }

  return newMoves;
}

function posToVertId(x, y, boardSize) {
  return  x + y * boardSize;
}

function knightGraph(boardSize) {

  var graph = new Graph();

  for (var y = 0; y < boardSize; y++) {
    for (var x = 0; x < boardSize; x++) {
      var vertId = posToVertId(x, y, boardSize);
      var newPositions = genLegalMoves(x, y, boardSize);

      for (var i in newPositions) {
        var posId = posToVertId(newPositions[i][0], newPositions[i][1], boardSize);
        graph.addEdge(vertId, posId);
      }
    }
  }

  return graph;
}

var Graph = require('./graph');
var boardSize = 8;
var knightGraph = knightGraph(boardSize);

var path = [];

function knightTour(graph, cellId, limit) {
  var vertex = graph.getVertex(cellId);
  vertex.visited = true;
  path.push(cellId);

  var done = false;

  if (path.length < limit) {
    var neighbors = vertex.connectedTo;
    neighbors.sort(function (a, b) {
      return graph.getVertex(a).connectedTo.length - graph.getVertex(b).connectedTo.length;
    });

    for (var i = 0; i < neighbors.length && !done; i++) {
      if (!(graph.getVertex(neighbors[i]).visited))
        done = knightTour(graph, neighbors[i], limit);
    }

    if (!done) {
      path.pop();
      vertex.visited = false;
    }
  }

  else
    done = true;

  return done;
}

knightTour(knightGraph, Number(process.argv[2]), boardSize * boardSize);
process.stdout.write(path.toString());

var fs = require('fs');

// fs.writeFileSync('path.txt', path.toString());