import {
  Service,
} from 'egg';
import {
  TestPhone,
} from '../utils/validator';
import bcrypt = require('bcryptjs');

/**
 * Member Service
 */
export default class Member extends Service {
  public hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  /**
   * 获取验证码
   *
   * @param {string} phone
   * @returns
   * @memberof Member
   */
  public async getCode(phone: string) {
    const {
      ctx,
    } = this;
    const rule = {
      phone: [{
          required: true,
          message: '请输入您的手机号码',
        },
              {
          validator: (_rule, value, callback) => {
            if (!value || TestPhone(value)) {
              callback();
            } else {
              callback('请输入正确的手机号码');
            }
          },
        },
      ],
    };
    const result = await ctx.validate(rule, {
      phone,
    });
    if (!result) {
      return;
    }
    ctx.success('请求成功', '1234');
  }

  /**
   * 登录
   *
   * @param {string} phone
   * @param {string} code
   * @returns
   * @memberof Member
   */
  public async login(phone: string, code: string) {
    const {
      ctx,
    } = this;
    const rule = {
      phone: [{
          required: true,
          message: '请输入您的手机号码',
        },
              {
          validator: (_rule, value, callback) => {
            if (!value || TestPhone(value)) {
              callback();
            } else {
              callback('请输入正确的手机号码');
            }
          },
        },
      ],
      code: {
        required: true,
        message: '请输入您的手机号码',
      },
    };
    const result = await ctx.validate(rule, {
      phone,
      code,
    });
    if (!result) {
      return;
    }
    console.log("ctx.model.user", ctx.model.user)
    return await ctx.model.user.findOrCreate({
      where: {
        phone,
      },
      defaults: {
        phone,
        password: this.hashPassword(code),
        username: phone,
        nickname: phone,
      },
    }).spread((user: any, created) => {
      ctx.success('请求成功', {
        id: user.id,
        created,
      });
    });
  }

  /**
   * 获取用户信息
   *
   * @param {string} memberId
   * @returns
   * @memberof Member
   */
  public async getInfo(memberId: string) {
    const {
      ctx,
    } = this;
    const result: any = await ctx.model.user.findOne({
      where: {
        id: memberId,
      },
    });
    if (!result) {
      ctx.fail('对不起,查无此用户信息');
      return;
    }
    ctx.success(null, {
      avatar: result.avatar,
      birthday: result.birthday,
      gender: result.gender,
      genderDisplay: result.genderDisplay,
      id: result.id,
      nickname: result.nickname,
      phone: result.phone,
      seatHeight: result.seatHeight,
      shoeSize: result.shoeSize,
      username: result.username,
    });
  }

  /**
   * 修改用户信息
   *
   * @param {string} memberId
   * @returns
   * @memberof Member
   */
  public async modify(query, modifyValue) {
    const {
      ctx,
    } = this;
    const result = await ctx.model.user.update(modifyValue, {
      where: query,
    });
    if (!result.length) {
      ctx.fail('修改失败');
      return;
    }
    ctx.success('修改成功');
  }
}
