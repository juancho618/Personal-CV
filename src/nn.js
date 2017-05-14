function neuralNetwork  (inputs, hiddenLayers, hidden, outputs){
  this.inputs = inputs;
  this.hiddenLayers = hiddenLayers;
  this.hidden = hidden;
  this.outputs = outputs;

  const  hidden_weights  = this.hiddenLayers ? (inputs+1) * this.hidden + (this.hiddenLayers-1) * (this.hidden+1) * this.hidden : 0;
  const  output_weights = (this.hiddenLayers ? (hidden+1) : (inputs+1)) * outputs;
  const  total_weights = (hidden_weights + output_weights);
  const  total_neurons = (inputs + hidden * this.hiddenLayers + outputs);
  var outVal=[];
  // weights assign
  var weights = [];

  // creating the weights
  for (var i = 0; i < this.total_weights; i++) {
    weights.push((Math.random() - 0.5));
  }

  this.sigmoid = (a)=>{
    return (1.0/(1 + Math.exp(-a)));
  }

  nn.getOutVal = function(i){
    return outVal[i];
  }

  this.run = function(dataInput){
    var x = 0;
    /* Figure hidden layers, if any. */
    for (var h = 0; h < this.hidden_layers; ++h) {
        for (var j = 0; j < this.hidden; ++j) {
            var sum = 0;
            for (var k = 0; k < (h == 0 ? this.inputs : this.hidden) + 1; ++k) {
                if (k == 0) {
                    sum += weights[x] * -1.0;
                } else {
                    sum += weights[x]  * dataInput[k-1];
                }
                x++;
            }
            outVal.push(sigmoid(sum));
        }
        //i += (h == 0 ? this.in : ann->hidden);
    }
    /* Figure output layer. */
    for (j = 0; j < this.outputs; ++j) {
        var sum = 0;
        for (k = 0; k < (this.hidden_layers ? this.hidden : this.inputs) + 1; ++k) {
            if (k == 0) {
                sum += weights[x] * -1.0;
            } else {
                sum += weights[x]* dataInput[k-1];
            }
              x++;
        }
        outVal.push(sigmoid(sum));
    }
  }

}

nn = neuralNetwork(2,1,2,1);
nn.run([0,0]);
console.log(nn.getOutVal());
