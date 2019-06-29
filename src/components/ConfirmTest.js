import React from "react"
import ReactDOM from "react-dom"

import Confirm from "./Confirm"
import "@reach/dialog/styles.css"
import "./styles.css"

class App extends React.Component {
    state = {
        select: "open"
    }

    handleSubmit = () => alert("Submitted")

    handleStatusChange = event => {
        this.setState({ select: event.target.value })
    }

    handleReset = event => alert("Resetted")

    render() {
        return (
            <div className="App">
                <Confirm title="Confirm" description="Are you sure?">
                    {confirm => (
                        <form onSubmit={confirm(this.handleSubmit)}>
                            <label>
                                Status:
                                <select
                                    value={this.state.select}
                                    onChange={confirm(this.handleStatusChange)}
                                >
                                    <option value="open">Open</option>
                                    <option value="close">Close</option>
                                </select>
                            </label>
                            <p>
                                <button type="reset" onClick={confirm(this.handleReset)}>
                                    Reset
                                </button>
                                <button>Submit</button>
                            </p>
                        </form>
                    )}
                </Confirm>
            </div>
        )
    }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

