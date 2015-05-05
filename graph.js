function Vertex(key) {
  this.id = key;
  this.visited = false;
  this.connectedTo = [];
}

Vertex.prototype.addNeighbor = function(neighbor) {
  this.connectedTo.push(neighbor);
};

function Graph() {
  this.vertList = {};
}

Graph.prototype = {
  addVertex: function(key) {
    var newVertex = new Vertex(key);
    this.vertList[key] = newVertex;
    return newVertex;
  },

  getVertex: function(key) {
    return this.vertList[key];
  },

  addEdge: function(from, to) {
    if (!(from in this.vertList)) 
      this.addVertex(from);

    if (!(to in this.vertList))
      this.addVertex(to);

    fromVertex = this.getVertex(from);
    toVertex = this.getVertex(to);

    fromVertex.addNeighbor(toVertex);
  } 
};

module.exports = Graph;