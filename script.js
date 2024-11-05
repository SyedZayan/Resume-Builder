var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        var _this = this;
        this.educationCount = 1;
        this.profilePicInput = document.getElementById("profilePic");
        this.nameInput = document.getElementById("name");
        this.emailInput = document.getElementById("email");
        this.phoneInput = document.getElementById("phone");
        this.skillsInput = document.getElementById("skills");
        this.generateButton = document.getElementById("generateResume");
        this.addEducationButton = document.getElementById("addEducation");
        this.educationContainer = document.getElementById("education-container");
        this.generateButton.addEventListener("click", function () { return _this.generateResume(); });
        this.addEducationButton.addEventListener("click", function () { return _this.addEducationField(); });
    }
    ResumeBuilder.prototype.addEducationField = function () {
        this.educationCount++;
        var educationDiv = document.createElement("div");
        educationDiv.classList.add("form-group");
        educationDiv.innerHTML = "\n            <label for=\"education".concat(this.educationCount, "\">Education ").concat(this.educationCount, "</label>\n            <textarea id=\"education").concat(this.educationCount, "\" rows=\"2\" placeholder=\"Enter education details\"></textarea>\n        ");
        this.educationContainer.appendChild(educationDiv);
    };
    ResumeBuilder.prototype.generateResume = function () {
        var _a;
        var profilePicUrl = ((_a = this.profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0])
            ? URL.createObjectURL(this.profilePicInput.files[0])
            : '';
        var name = this.nameInput.value;
        var email = this.emailInput.value;
        var phone = this.phoneInput.value;
        var skills = this.skillsInput.value.split(',').map(function (skill) { return skill.trim(); });
        var educationElements = Array.from(document.querySelectorAll("#education-container textarea"));
        var educationList = educationElements.map(function (education) { return education.value; });
        var resumeHtml = "\n            <html>\n                <head>\n                    <title>".concat(name, "'s Resume</title>\n                    <link rel=\"stylesheet\" href=\"styles.css\">\n                </head>\n                <body>\n                    <div class=\"resume-container\">\n                        <div class=\"profile-section\">\n                            <img src=\"").concat(profilePicUrl, "\" alt=\"Profile Picture\" class=\"profile-pic-icon\">\n                            <h2>").concat(name, "</h2>\n                            <p>").concat(email, " | ").concat(phone, "</p>\n                        </div>\n                        <div class=\"content-section\">\n                            <h3>Skills</h3>\n                            <ul>").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n                            <h3>Education</h3>\n                            <ul>").concat(educationList.map(function (item) { return "<li>".concat(item, "</li>"); }).join(''), "</ul>\n                        </div>\n                        <div class=\"resume-actions\">\n                            <button onclick=\"window.opener.postMessage('edit', '*'); window.close();\" class=\"edit-button\">Edit</button>\n                            <button onclick=\"window.print();\" class=\"download-button\">Download as PDF</button>\n                        </div>\n                    </div>\n                </body>\n            </html>\n        ");
        var resumeWindow = window.open("", "_blank");
        resumeWindow === null || resumeWindow === void 0 ? void 0 : resumeWindow.document.write(resumeHtml);
    };
    return ResumeBuilder;
}());
window.onload = function () {
    new ResumeBuilder();
    window.addEventListener("message", function (event) {
        var _a;
        if (event.data === "edit") {
            (_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
        }
    });
};
