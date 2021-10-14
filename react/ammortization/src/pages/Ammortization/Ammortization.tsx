import React, {Component} from 'react';

export default class Ammortization extends Component{
    constructor(props:any) {
        super(props);
        this.state = {isToggleOn: true};
    
        // This binding is necessary to make `this` work in the callback
        this.computeAmmortization = this.computeAmmortization.bind(this);
      }
    
      computeAmmortization() {
        // e.preventDefault();
        console.log('Compute Ammortization');
      }
   
    render() {

        // function computeAmmortization(e:any) {
        //     e.preventDefault();
        //     console.log('You clicked submit.');
        //   }
        return(
            <div className="row">
      <button
        id="compBut"
        type="submit"
        onClick={this.computeAmmortization}
        className="btn btn-primary"
      >
        Compute
      </button>
    </div>

        )
    }
}