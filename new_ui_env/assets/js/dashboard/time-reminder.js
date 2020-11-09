function timerReminder() {
    setTimeout(function() {
        swal({
            title: "Timer reminder",
            text: `You have logged in for 5 minutes, Did you forget to start your time?`,
            icon: "warning",
            button: "Okay",
        })
    }, 50000)
}