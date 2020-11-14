rvar paceDB = JSON.parse(localStorage.getItem("paceDB"));

function editProfileFunc() {
    var editProfile = `
  <div class="profile-part2-top">
            <p>Personal Details</p>
          </div>
          <div class="profile-part2-content">
            <div class="profile-fill-in">
              <div>
                  <label>First Name:</label>
                  <div><p contenteditable="true" id="user-first-name">John</p></div>
              </div>
              <div>
                  <label>Phone Number:</label>
                  <div><p contenteditable="true" id="user-phone">09090798616</p></div>
              </div>
              <div>
                  <label>Home Address:</label>
                  <div><p contenteditable="true">12, TIIDELab road, Garki, Abuja.</p></div>
              </div>
              <div>
                  <label>Country:</label>
                  <div><p contenteditable="true">Nigeria</p></div>
              </div>
          </div>
          <div class="profile-fill-in">
              <div>
                  <label>Last Name:</label>
                  <div><p contenteditable="true">Doe</p></div>
              </div>
              <div>
                  <label>Email Address:</label>
                  <div><p contenteditable="true" id="user-email">john.doe@tiidelab.com</p></div>
              </div>
              <div>
                  <label>State:</label>
                  <div><p contenteditable="true">FCT</p></div>
              </div>
              
          </div>
          </div>
          <div class="profile-part2-bottom">
            <a href="#">Update</a>
          </div>`

    document.getElementById("profile-content").innerHTML = editProfile;
    document.getElementById("user-first-name").innerHTML = paceDB[0].name;
    document.getElementById("user-phone").innerHTML = paceDB[0].phone;
    document.getElementById("user-email").innerHTML = paceDB[0].email;

}

function notificationSettingsFunc() {
    var notificationDiv = `
          <div class="profile-part2-top">
            <p>Notifications</p>
          </div>
          <div class="notification-content">
            <div class="notification-value"> <p> Play sound for notifications</p> <div> <toggle-switch></toggle-switch> </div> </div>
            <div class="notification-value"> <p>Send Reminder for tasks before due date</p><div><toggle-switch></toggle-switch></div> </div>
            <div class="notification-value"> <p>Show all notification in notification center</p> <div><toggle-switch></toggle-switch></div></div>
            <div class="notification-value"> <p>Notify me for upcoming meetings on Schedule</p> <div><toggle-switch></toggle-switch></div></div>
            <div class="notification-value"> <p>Show notification for memos and document</p><div><toggle-switch></toggle-switch></div> </div> 
            <div class="notification-value"> <p>Show notification for direct messages</p><div><toggle-switch></toggle-switch></div> </div> 
          </div>
          
          <div class="profile-part2-bottom">
            <a href="#">Update</a>
          </div>
  `;
    document.getElementById("profile-content").innerHTML = notificationDiv;
}

function changePasswordFunc() {
    var changePasswordDiv = `
    <div class="profile-part2-top">
            <p>Change Password</p>
          </div>
          <div class="profile-part2-content">
            <div class="change-password-form">
              <div><label for="Current password">Current Password:</label>
              <input type="password" name="password" id="present-password"></div>
              <div><label for="New password">New Password:</label>
              <input type="password" name="new-password" id="new-password"></div>
              <div><label for="Confirm password">Confirm Password:</label>
              <input type="password" name="confirm-password" id="confirm-password"></div>
              <a href="#" id="submit-password">Submit</a>
          </div>
          </div>`;

    document.getElementById("profile-content").innerHTML = changePasswordDiv;
}

function submitPasswordChange() {
    alert(document.getElementById("present-password").value)
    if (document.getElementById("present-password").innerHTML == paceDB[paceDB.length - 1].password) {
        if (document.getElementById("new-password").value == document.getElementById("confirm-password")) {
            paceDB[0].password = document.getElementById("new-password").value
            localStorage.setItem("paceDB", paceDB)
        } else {
            swal("Oops!", "Password mismatch", "warning")
        }
    } else {
        swal("Oops!", "Your password is wrong", "warning")
    }
}

document.getElementById("edit-profile").addEventListener("click", editProfileFunc);

document.getElementById("notification-setting").addEventListener("click", notificationSettingsFunc);

document.getElementById("change-password").addEventListener("click", changePasswordFunc);

// document.getElementById("submit-password").addEventListener("click",submitPasswordChange);