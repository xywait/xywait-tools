import { createHash } from "crypto";
const path = require("path");
const fs = require("fs");
const moment = require("moment");

/**
 * 获取密码盐
 * @param len:number 密码盐长度
 * @returns:string
 */
export function getSalt(len: number = 6) {
	const arr = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
	];
	var str = "";
	for (var i = 0; i < len; i++) {
		str += arr[Math.floor(Math.random() * 26)];
	}
	return str;
};

/**
 * 密码MD5加密
 * @param password 密码:明码
 * @param key 密码盐
 * @returns
 */
export async function cryptoMd5(password, key) {
	const hash1 = await createHash("md5").update(password).digest("hex");
	const hash2 = await createHash("md5")
		.update(hash1 + key)
		.digest("hex");
	return hash2;
};

/**
 * 生成时间组成的no
 * @param prefixes 前缀
 * @param suffixes 后缀
 * @returns
 */
export function getTimeNo(prefixes = '', suffixes= ''): string{
	let current = moment();
	let year = current.get("years");
	let month = current.get("months");
	let date = current.get("dates");
	let hour = current.get("hours");
	let minute = current.get("minutes");
	let second = current.get("seconds");
	let millisecond = current.get("milliseconds");
	year = year.toString().substr(-2);
	month = month + 1 < 10 ? `0${month + 1}` : month + 1;
	date = date < 10 ? `0${date}` : date;
	hour = hour < 10 ? `0${hour}` : hour;
	minute = minute < 10 ? `0${minute}` : minute;
	second = second < 10 ? `0${second}` : second;
	millisecond =
		millisecond < 10
			? `00${millisecond}`
			: millisecond < 100
			? `0${millisecond}`
			: millisecond;
	return `${prefixes}${year}${month}${date}${hour}${minute}${second}${millisecond}${suffixes}`;
};
