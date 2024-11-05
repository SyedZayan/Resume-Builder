class ResumeBuilder {
    private educationCount = 1;
    private profilePicInput = document.getElementById("profilePic") as HTMLInputElement;
    private nameInput = document.getElementById("name") as HTMLInputElement;
    private emailInput = document.getElementById("email") as HTMLInputElement;
    private phoneInput = document.getElementById("phone") as HTMLInputElement;
    private skillsInput = document.getElementById("skills") as HTMLInputElement;
    private generateButton = document.getElementById("generateResume") as HTMLButtonElement;
    private addEducationButton = document.getElementById("addEducation") as HTMLButtonElement;
    private educationContainer = document.getElementById("education-container") as HTMLElement;

    constructor() {
        this.generateButton.addEventListener("click", () => this.generateResume());
        this.addEducationButton.addEventListener("click", () => this.addEducationField());
    }

    private addEducationField() {
        this.educationCount++;
        const educationDiv = document.createElement("div");
        educationDiv.classList.add("form-group");
        educationDiv.innerHTML = `
            <label for="education${this.educationCount}">Education ${this.educationCount}</label>
            <textarea id="education${this.educationCount}" rows="2" placeholder="Enter education details"></textarea>
        `;
        this.educationContainer.appendChild(educationDiv);
    }

    private generateResume() {
        const profilePicUrl = this.profilePicInput.files?.[0]
            ? URL.createObjectURL(this.profilePicInput.files[0])
            : '';

        const name = this.nameInput.value;
        const email = this.emailInput.value;
        const phone = this.phoneInput.value;
        const skills = this.skillsInput.value.split(',').map(skill => skill.trim());
        
        const educationElements = Array.from(
            document.querySelectorAll(`#education-container textarea`)
        ) as HTMLTextAreaElement[];
        
        const educationList = educationElements.map((education) => education.value);

        const resumeHtml = `
            <html>
                <head>
                    <title>${name}'s Resume</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <div class="resume-container">
                        <div class="profile-section">
                            <img src="${profilePicUrl}" alt="Profile Picture" class="profile-pic-icon">
                            <h2>${name}</h2>
                            <p>${email} | ${phone}</p>
                        </div>
                        <div class="content-section">
                            <h3>Skills</h3>
                            <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                            <h3>Education</h3>
                            <ul>${educationList.map(item => `<li>${item}</li>`).join('')}</ul>
                        </div>
                        <div class="resume-actions">
                            <button onclick="window.opener.postMessage('edit', '*'); window.close();" class="edit-button">Edit</button>
                            <button onclick="window.print();" class="download-button">Download as PDF</button>
                        </div>
                    </div>
                </body>
            </html>
        `;

        const resumeWindow = window.open("", "_blank");
        resumeWindow?.document.write(resumeHtml);
    }
}

window.onload = () => {
    new ResumeBuilder();
    
    window.addEventListener("message", (event) => {
        if (event.data === "edit") {
            document.getElementById("resumeForm")?.scrollIntoView();
        }
    });
};
