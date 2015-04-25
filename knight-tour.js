function genLegalMoves(x, y, bdSize) {

  function isLegal(x, bdSize) {
    if (x >= 0 && x < bdSize)
      return true;

    return false;
  }

  newMoves = [];
  moveOffsets =  [[-1,-2],[-1,2],[-2,-1],[-2,1],[1,-2],[1,2],[ 2,-1],[ 2,1]];

  for (var i in moveOffsets) {
    var newX = x + moveOffsets[i][0];
    var newY = y + moveOffsets[i][1];

    if (isLegal(newX, bdSize) && isLegal(newY, bdSize))
      newMoves.push([newX, newY]);
  }

  return newMoves;
}

function posToVertId(x, y, bdSize) {
  return  x + y * bdSize;
}

function knightGraph(bdSize) {

  var graph = new Graph();

  for (var y = 0; y < bdSize; y++) {
    for (var x = 0; x < bdSize; x++) {
      var vertId = posToVertId(x, y, bdSize);
      var newPositions = genLegalMoves(x, y, bdSize);

      for (var i in newPositions) {
        var posId = posToVertId(newPositions[i][0], newPositions[i][1], bdSize);
        graph.addEdge(vertId, posId);
      }
    }
  }

  return graph;
}

var Graph = require('./graph');
var knightGraph = knightGraph(8);

var path = [];

function knightTour(graph, cellId, limit) {
  var vertex = graph.getVertex(cellId);
  vertex.color = 'gray';
  path.push(cellId);

  var done = false;

  if (path.length < limit) {
    var neighbors = vertex.connectedTo;
    var i = 0;

    while (i < neighbors.length && !done) {
      if (graph.getVertex(neighbors[i]).color == 'white')
        done = knightTour(graph, neighbors[i], limit);
      i++;
    }

    if (!done) {
      path.pop();
      vertex.color = 'white';
    }
  }

  else
    done = true;

  return done;
}

knightTour(knightGraph, process.argv[2], 64);
console.log(path);

var fs = require('fs');

fs.writeFileSync('path.txt', path.toString());