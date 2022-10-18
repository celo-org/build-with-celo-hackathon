import "./question.css"

function Question(props) {
    return(
        <div className="listcontainer">
				<div id="question-div">
					<div>
						<p id="question">{props.question}</p>
					</div>
					<div id="creator">
						<p>Created by {props.creator}</p>
					</div>
				</div>
				<div id="reward-div">
					<p>{props.reward}</p>
				</div>
			</div>
    )
}

export default Question;