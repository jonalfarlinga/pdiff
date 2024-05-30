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
                <p>This website will create an empty syllabus for your next class.</p>
                <p>On the form, select your institution, and fill in the relevant info for your semester and className session. Then Click the Get Calendar button to generate a table on the page. You can highlight and cut/paste the table to your favorite text editor!</p>
                <p>I plan to implement .docx output soon, but if you want it now, you can get the terminal version of Calends <a href="https://github.com/jonalfarlinga/calends">here.</a></p>
                <p>To report bugs or request new institutions or features, start an issue on <a href="https://github.com/jonalfarlinga/calends-online/issues">Github</a> or contact me on <a href="mailto:denny.bucklin@gmail.com">Gmail.</a></p>
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
