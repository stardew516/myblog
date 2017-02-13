$(document).ready(function () {
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));

  $('#checkForm').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      firstName: {
        validators: {
          notEmpty: {
            message: '姓不能为空'
          }
        }
      },
      lastName: {
        validators: {
          notEmpty: {
            message: '名不能为空'
          }
        }
      },
      username: {
        message: '用户名无效',
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 6,
            max: 30,
            message: '用户名长度必须在6~30之间'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名只能是字母数字.下划线的组合'
          }
          //,
          //different: {
          //  field: 'password',
          //  message: '用户名不能和密码一致'
          //}
        }
      },
      email: {
        validators: {
          //notEmpty: {
          //  message: '邮箱不能为空'
          //},
          emailAddress: {
            message: '请填写有效邮箱'
          }
        }
      },
      phone: {
        validators: {
          //notEmpty: {
          //  message: '手机号不能为空'
          //},
          digits: {
            message: '请输入正确的手机号'
          },
          stringLength: {
            min: 11,
            max: 11,
            message: '手机号长度不对'
          }
        }
      },
      passwordOne: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          }
        }
      },
      password: {
        validators: {
          //notEmpty: {
          //  message: '密码不能为空'
          //},
          identical: {
            field: 'confirmPassword',
            message: '密码不一致'
          },
          different: {
            field: 'username',
            message: '密码不能和用户名一致'
          }
        }
      },
      confirmPassword: {
        validators: {
          //notEmpty: {
          //  message: '确认密码不为空'
          //},
          identical: {
            field: 'password',
            message: '密码不一致'
          },
          different: {
            field: 'username',
            message: '确认密码不能和用户名相同'
          }
        }
      },
      birthday: {
        validators: {
          date: {
            format: 'YYYY/MM/DD',
            message: '请填写有效生日信息'
          }
        }
      },
      gender: {
        validators: {
          notEmpty: {
            message: '请选择性别'
          }
        }
      },
      'languages[]': {
        validators: {
          notEmpty: {
            message: '请选择一门语言'
          }
        }
      },
      'programs[]': {
        validators: {
          choice: {
            min: 2,
            max: 4,
            message: '请填写2-4门你擅长的程序语言'
          }
        }
      },
      captcha: {
        validators: {
          callback: {
            message: '答案不对',
            callback: function (value, validator) {
              var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
              return value == sum;
            }
          }
        }
      }
    }
  });

  // Validate the form manually
  $('#validateBtn').click(function () {
    $('#checkForm').bootstrapValidator('validate');
  });

  $('#resetBtn').click(function () {
    $('#checkForm').data('bootstrapValidator').resetForm(true);
  });
});
