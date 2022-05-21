import { Neuron } from './Neuron'

export class NeuralNet {
  private inputNeurons: Neuron[]
  private hiddenNeurons: Neuron[]
  private outputNeurons: Neuron[]

  constructor(inputs: number, hidden: number, outputs: number) {
    this.inputNeurons = new Array<Neuron>(inputs)
    this.hiddenNeurons = new Array<Neuron>(hidden)
    this.outputNeurons = new Array<Neuron>(outputs)
  }

  private connect(): void {
    for (let i = 0; i < this.inputNeurons.length; i++) {
      for (let j = 0; j < this.hiddenNeurons.length; j++) {
        this.inputNeurons[i].connect(this.hiddenNeurons[j], Math.random())
      }
    }

    for (let i = 0; i < this.hiddenNeurons.length; i++) {
      for (let j = 0; j < this.outputNeurons.length; j++) {
        this.hiddenNeurons[i].connect(this.outputNeurons[j], Math.random())
      }
    }
  }

  public activate(inputs: number[]): number[] {
    this.inputNeurons.forEach((neuron, i) => neuron.activate(inputs[i]))
    this.hiddenNeurons.forEach(neuron => neuron.activate(0))
    return this.outputNeurons.map(neuron => neuron.activate(0))
  }

  public propagate(errors: number[]): void {
    this.outputNeurons.forEach((neuron, i) => neuron.propagate(errors[i]))
    this.hiddenNeurons.forEach(neuron => neuron.propagate(0))
  }

    public toObject(): object {
        return {
            inputNeurons: this.inputNeurons.map(neuron => neuron.toObject()),
            hiddenNeurons: this.hiddenNeurons.map(neuron => neuron.toObject()),
            outputNeurons: this.outputNeurons.map(neuron => neuron.toObject())
        }
    }

    public train(inputs: number[], outputs: number[]): void {
        const errors = this.activate(inputs).map((output, i) => outputs[i] - output)
        this.propagate(errors)
    }
}
