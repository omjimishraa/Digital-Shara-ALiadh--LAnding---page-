$(document).ready(function() {
    // jQuery code

    //////////////////////// Prevent closing from click inside dropdown
    $(document).on('click', '.dropdown-menu', function(e) {
        e.stopPropagation();
    });


});

/**Inquiry Form */
$(document).ready(function() {
            // inquiry form 
            // lead creation
            function lead_creation() {
                frappe.call({
                    method: "finbyzweb.api.set_form_data",
                    args: {
                        'lead_name': $('#lead_name').val(),
                        'company_name': $('#company_name').val(),
                        'mobile_no': $('#mobile_no').val(),
                        'title': document.title + '</br>' + window.location.href,
                        'email': $('#email').val()
                    },
                    callback: function(r) {
                        $('#lead_name').val('');
                        $('#company_name').val('');
                        $('#mobile_no').val('');
                        $('#email').val('');
                    }
                });
            };

            //validation and animation	
            $(function() {
                let show = 'show';

                $('.inquiry-main .inquiry-input').on('checkval', function() {
                    let label = $(this).next('label');
                    if (this.value !== '') {
                        label.addClass(show);
                    } else {
                        label.removeClass(show);
                    }
                }).on('keyup', function() {
                    $(this).trigger('checkval');
                });

            });

            var form = $('#inquiry'),
                submit = form.find('[name="submit"]');

            form.on('submit', function(e) {
                e.preventDefault();

                // avoid spamming buttons
                if (submit.attr('value') !== 'Send')
                    return;

                var valid = true;
                form.find('input').removeClass('invalid').each(function() {
                    if (!this.value) {
                        $(this).addClass('invalid');
                        valid = false;
                    }
                });

                if (!valid) {
                    form.animate({ left: '-3em' }, 50)
                        .animate({ left: '3em' }, 100)
                        .animate({ left: '0' }, 50);
                } else {
                    submit.attr('value', 'Sending...');
                    // simulate AJAX response
                    setTimeout(function() {
                        // step 1: slide labels and inputs
                        // when AJAX responds with success
                        // no animation for AJAX failure yet
                        $("#inquiry-form").toggle({ effect: "scale", direction: "vertical" });
                        form.find('label')

                        .animate({ left: '100%' }, 500)
                            .animate({ opacity: '0' }, 500);
                    }, 1000);
                    setTimeout(function() {
                        // step 2: show thank you message after step 1
                        submit.attr('value', 'Thank you :)')
                            .css({ boxShadow: 'none' });
                    }, 1000);
                    setTimeout(function() {
                        // step 3: reset
                        $("#inquiry-form").toggle({ effect: "scale", direction: "vertical" });

                        form.find('label')
                            .css({ left: '0' })
                            .animate({ opacity: '1' }, 500);
                        submit.attr('value', 'Send')
                            .css({ backgroundColor: '' });
                        lead_creation();
                    }, 3000);
                    let show = 'show';
                    $('.inquiry-main', function() {
                        let label = $('.inquiry-label');
                        label.removeClass(show);

                    });
                }
            });
            /**Inquiry Form */