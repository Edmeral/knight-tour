function Vertex(key) {
  this.id = key;
  this.predecessor = null;
  this.color = 'white';
  this.connectedTo = [];
}

Vertex.prototype.addNeighbor = function(neighbor) {
  this.connectedTo.push(neighbor);
};

function Graph() {
  this.vertList = {};
  this.numVertices = 0;
}

Graph.prototype = {
  addVertex: function(key) {
    this.numVertices++;
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

    this.vertList[from].addNeighbor(to);
  } 
};

module.exports = Graph;

