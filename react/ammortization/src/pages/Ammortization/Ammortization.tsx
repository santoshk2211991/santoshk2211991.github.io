import React, {Component, useState} from 'react';

export default class Ammortization extends Component{

    // const [interest:any, setInterest:any] = useState({});

    // const [portfolioData, setPortfoloioData] = useState<any[]>([]);
    state: any = {
        // optional second annotation for better type inference
        interest: 0,
        loanAmount:0,
        months:0,
        date:null
      };

    constructor(props:any) {
        super(props);
        this.state = {interest: 0, loanAmount:0,
            months:0,
            date:null};
    
        // This binding is necessary to make `this` work in the callback
        this.computeAmmortization = this.computeAmmortization.bind(this);
        this.updateState = this.updateState.bind(this);
      }
    
      computeAmmortization() {
        // e.preventDefault();
        console.log('Compute Ammortization',this.state);
      }

      updateState(e:any){
        console.log(e.target.id, e.target.value)
        let obj:any = {

        }
        obj[e.target.id] = e.target.value;
        this.setState({...this.state,...obj})
        console.log(this.state);
      }
   
    render() {


        // function computeAmmortization(e:any) {
        //     e.preventDefault();
        //     console.log('You clicked submit.');
        //   }
        return(
            <>
            
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
    <div className="row">
      <div className="col-md-12 row">
        
        <div className="col-md-6">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="interest">Interest:</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="interest"
              id='interest'
              onChange = {this.updateState}
              v-model="interest"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="loan-amount"
                >Loan Amount:</span
              >
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="Loan"
              aria-label="Loan Amount"
              aria-describedby="loan-amount"
              id="loanAmount"
              onChange = {this.updateState}

              v-model="loanAmount"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="months">Months:</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="months"
              aria-label="Months"
              aria-describedby="months"
              onChange = {this.updateState}
            id="months"
              v-model="months"
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="date">Date:</span>
            </div>
            <input
              type="month"
              className="form-control"
              placeholder="date"
              aria-label="Date"
              aria-describedby="date"
              id="date"
              onChange = {this.updateState}

              v-model="date"
            />
          </div>
        </div>
      </div>
    </div>  
            </>

        )
    }
}