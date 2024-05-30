export default function WelcomeModal({uniStyle}) {
    return (
        <div
            className="modal fade"
            id="welcomeModal"
            tabIndex="-1"
            aria-labelledby="welcomeModalLabel"
            aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                    className="modal-title fs-5"
                    id="welcomeModalLabel"
                >
                  Welcome!
                </h1>
                <button
                    type="button"
                    className=
                      { "btn btn-primary " +
                        (uniStyle ? "btn-" + uniStyle : null) }
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
              </div>
            <div className="modal-body">
                <p>This website will take two versions of a pdf and return a summary of the textual changes from the first to the second.</p>
                <p>On the form, select the pre version of the pdf using the first input box. Then select the post version of the document in the second box. Press the Get Differences button and the changes will fill in on the blackboard. If you check Paginate Results, the output will show one page, with navigation buttons.</p>
                <p>P.S. There is no reason you can't upload two totally different pdfs, but you'll get more use out of the app if they are two versions of the same document.</p>
                <p>To report bugs or request new features, start an issue on <a href="https://github.com/jonalfarlinga/pdiff">Github</a> or contact me on <a href="mailto:denny.bucklin@gmail.com">Gmail.</a></p>
                <p>Enjoy!</p>
            </div>
              <div className="modal-footer">
                <button
                    type="button"
                    className=
                      { "btn btn-primary " +
                        (uniStyle ? "btn-" + uniStyle : null) }
                    data-bs-dismiss="modal"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}
