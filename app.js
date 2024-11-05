// Step 3: Create TypeScript code for interactivity
// app.ts
document.addEventListener("DOMContentLoaded", function () {
    var generateBtn = document.getElementById("generate-btn");
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var skillsInput = document.getElementById("skills");
    var previewContent = document.getElementById("preview-content");
    generateBtn.addEventListener("click", function () {
        // Get user input values
        var name = nameInput.value.trim();
        var email = emailInput.value.trim();
        var phone = phoneInput.value.trim();
        var skills = skillsInput.value.split(",").map(function (skill) { return skill.trim(); }).filter(function (skill) { return skill; });
        // Build resume content
        var resumeHTML = "<h3>" + name + "</h3>";
        resumeHTML += "<p>Email: " + email + "</p>";
        resumeHTML += "<p>Phone: " + phone + "</p>";
        resumeHTML += "<h4>Skills</h4>";
        resumeHTML += "<ul>";
        skills.forEach(function (skill) {
            resumeHTML += "<li>" + skill + "</li>";
        });
        resumeHTML += "</ul>";
        // Render resume preview
        previewContent.innerHTML = resumeHTML;
    });
});
