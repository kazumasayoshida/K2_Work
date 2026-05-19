"use client";

import { useState, useRef } from "react";
import {
  CheckCircle,
  ChevronRight,
  Users,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Baby,
  Calendar,
  MessageSquare,
  Shield,
  Heart,
  Sparkles,
  ChevronDown,
} from "lucide-react";

type FormData = {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  phone: string;
  email: string;
  childAge: string;
  preferredDate: string;
  motivation: string;
  heardFrom: string;
  agreement: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const SEMINAR_DATES = [
  "2026年6月7日（土）10:00〜11:30",
  "2026年6月14日（土）10:00〜11:30",
  "2026年6月21日（土）10:00〜11:30",
  "2026年6月28日（土）10:00〜11:30",
  "2026年7月5日（土）10:00〜11:30",
  "2026年7月12日（土）10:00〜11:30",
];

const HEARD_FROM_OPTIONS = [
  "Instagram",
  "Facebook",
  "知人・友人の紹介",
  "チラシ・パンフレット",
  "その他",
];

const BENEFITS = [
  {
    icon: "🧘",
    title: "姿勢が整う",
    desc: "体の中心軸を意識することで自然と姿勢がよくなります",
  },
  {
    icon: "🎯",
    title: "集中力アップ",
    desc: "体軸が整うと脳への血流が改善し、学習効率が向上します",
  },
  {
    icon: "🏃",
    title: "運動能力向上",
    desc: "スポーツや日常動作のパフォーマンスが格段に上がります",
  },
  {
    icon: "😊",
    title: "親子の絆",
    desc: "一緒に体を動かすことで親子のコミュニケーションが深まります",
  },
];

const TESTIMONIALS = [
  {
    name: "T.K さん（お子さん8歳）",
    text: "息子の姿勢が悪くて悩んでいましたが、セミナー後から自分で気をつけるようになりました。先生の教え方がとても分かりやすかったです！",
    stars: 5,
  },
  {
    name: "M.S さん（お子さん6歳・10歳）",
    text: "子ども二人と参加しました。親子で楽しみながら体の使い方を学べて大満足。習い事として続けたいと子どもたちが言っています。",
    stars: 5,
  },
  {
    name: "Y.N さん（お子さん7歳）",
    text: "運動が苦手な娘が「もっとやりたい！」と言ったのに驚きました。体軸を意識するだけでこんなに変わるんですね。",
    stars: 5,
  },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.lastName.trim()) errors.lastName = "姓を入力してください";
  if (!data.firstName.trim()) errors.firstName = "名を入力してください";
  if (!data.lastNameKana.trim()) errors.lastNameKana = "姓（ふりがな）を入力してください";
  if (!data.firstNameKana.trim()) errors.firstNameKana = "名（ふりがな）を入力してください";
  if (!data.phone.trim()) {
    errors.phone = "電話番号を入力してください";
  } else if (!/^[\d\-+() ]{10,15}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "正しい電話番号を入力してください";
  }
  if (!data.email.trim()) {
    errors.email = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "正しいメールアドレスを入力してください";
  }
  if (!data.childAge) errors.childAge = "お子さんの年齢を選択してください";
  if (!data.preferredDate) errors.preferredDate = "希望日を選択してください";
  if (!data.heardFrom) errors.heardFrom = "お選びください";
  if (!data.agreement) errors.agreement = "個人情報の取り扱いへの同意が必要です";
  return errors;
}

export default function SignupForm() {
  const [form, setForm] = useState<FormData>({
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    phone: "",
    email: "",
    childAge: "",
    preferredDate: "",
    motivation: "",
    heardFrom: "",
    agreement: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = document.querySelector(".error-field");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-sage-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-sage-700 mb-4">
              お申込みありがとうございます！
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              ご登録のメールアドレスに確認メールをお送りしました。
              <br />
              <br />
              担当者より2営業日以内にご連絡差し上げます。
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <div className="bg-sage-50 rounded-2xl p-4 text-left">
              <p className="text-sm font-semibold text-sage-700 mb-2">お申込み内容</p>
              <p className="text-sm text-gray-600">
                お名前：{form.lastName} {form.firstName} 様
              </p>
              <p className="text-sm text-gray-600">希望日：{form.preferredDate}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                ※ 確認メールが届かない場合は迷惑メールフォルダをご確認ください
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-sage-600 via-sage-500 to-sage-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            参加費無料・先着20組限定
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            お子さんの姿勢・集中力・
            <br className="hidden sm:block" />
            運動能力が変わる
            <br />
            <span className="text-peach-200">体軸体験セミナー</span>
          </h1>
          <p className="text-sage-100 text-base md:text-lg leading-relaxed mb-6">
            「うちの子、姿勢が悪くて…」「すぐ集中力が切れて…」
            <br />
            そんなお悩みを抱えるパパ・ママへ。
            <br />
            <span className="text-white font-semibold">たった90分</span>
            で体の使い方の基本が変わります。
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-white">
            <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm">
              <Clock className="w-4 h-4" /> 90分 / 完全無料
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm">
              <Users className="w-4 h-4" /> 4歳〜小学生のお子さん対象
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm">
              <MapPin className="w-4 h-4" /> 大阪市北区
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-cream" style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
      </div>

      {/* Benefits */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-center text-sage-700 mb-6">
          このセミナーで得られること
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-10">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100 hover:border-sage-300 transition-colors"
            >
              <div className="text-2xl mb-2">{b.icon}</div>
              <p className="font-bold text-sage-700 text-sm mb-1">{b.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-center text-sage-700 mb-6">
            参加した親御さんの声
          </h2>
          <div className="space-y-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-peach-400 text-peach-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">「{t.text}」</p>
                <p className="text-xs font-semibold text-sage-600">{t.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div ref={formRef} className="bg-white rounded-3xl shadow-lg border border-sage-100 overflow-hidden">
          <div className="bg-gradient-to-r from-sage-500 to-sage-400 px-6 py-5">
            <h2 className="text-xl font-bold text-white">無料体験セミナー お申込みフォーム</h2>
            <p className="text-sage-100 text-sm mt-1">必須項目をご入力のうえ送信してください</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="px-6 py-7 space-y-6">
            {/* Name */}
            <div>
              <label className="form-label">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-sage-400" />
                  お名前
                  <span className="required-badge">必須</span>
                </span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className={errors.lastName ? "error-field" : ""}>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="例：山田"
                    className={`form-input ${errors.lastName ? "border-red-400 bg-red-50" : ""}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
                <div className={errors.firstName ? "error-field" : ""}>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="例：花子"
                    className={`form-input ${errors.firstName ? "border-red-400 bg-red-50" : ""}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Name Kana */}
            <div>
              <label className="form-label">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-sage-400" />
                  ふりがな
                  <span className="required-badge">必須</span>
                </span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className={errors.lastNameKana ? "error-field" : ""}>
                  <input
                    type="text"
                    name="lastNameKana"
                    value={form.lastNameKana}
                    onChange={handleChange}
                    placeholder="やまだ"
                    className={`form-input ${errors.lastNameKana ? "border-red-400 bg-red-50" : ""}`}
                  />
                  {errors.lastNameKana && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastNameKana}</p>
                  )}
                </div>
                <div className={errors.firstNameKana ? "error-field" : ""}>
                  <input
                    type="text"
                    name="firstNameKana"
                    value={form.firstNameKana}
                    onChange={handleChange}
                    placeholder="はなこ"
                    className={`form-input ${errors.firstNameKana ? "border-red-400 bg-red-50" : ""}`}
                  />
                  {errors.firstNameKana && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstNameKana}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className={errors.phone ? "error-field" : ""}>
              <label className="form-label">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-sage-400" />
                  電話番号
                  <span className="required-badge">必須</span>
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="例：090-1234-5678"
                className={`form-input ${errors.phone ? "border-red-400 bg-red-50" : ""}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className={errors.email ? "error-field" : ""}>
              <label className="form-label">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-sage-400" />
                  メールアドレス
                  <span className="required-badge">必須</span>
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="例：hanako@example.com"
                className={`form-input ${errors.email ? "border-red-400 bg-red-50" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Child Age */}
            <div className={errors.childAge ? "error-field" : ""}>
              <label className="form-label">
                <span className="flex items-center gap-1.5">
                  <Baby className="w-4 h-4 text-sage-400" />
                  お子さんの年齢
                  <span className="required-badge">必須</span>
                </span>
              </label>
              <div className="relative">
                <select
                  name="childAge"
                  value={form.childAge}
                  onChange={handleChange}
                  className={`form-input appearance-none pr-10 ${
                    errors.childAge ? "border-red-400 bg-red-50" : ""
                  } ${!form.childAge ? "text-gray-400" : "text-gray-800"}`}
                >
                  <option value="">選択してください</option>
                  <option value="4歳">4歳</option>
                  <option value="5歳">5歳</option>
                  <option value="6歳（小1）">6歳（小1）</option>
                  <option value="7歳（小2）">7歳（小2）</option>
                  <option value="8歳（小3）">8歳（小3）</option>
                  <option value="9歳（小4）">9歳（小4）</option>
                  <option value="10歳（小5）">10歳（小5）</option>
                  <option value="11歳（小6）">11歳（小6）</option>
                  <option value="複数（年齢異なる）">複数（年齢異なる）</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.childAge && <p className="text-red-500 text-xs mt-1">{errors.childAge}</p>}
            </div>

            {/* Preferred Date */}
            <div className={errors.preferredDate ? "error-field" : ""}>
              <label className="form-label">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sage-400" />
                  ご希望の日程
                  <span className="required-badge">必須</span>
                </span>
              </label>
              <div className="relative">
                <select
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  className={`form-input appearance-none pr-10 ${
                    errors.preferredDate ? "border-red-400 bg-red-50" : ""
                  } ${!form.preferredDate ? "text-gray-400" : "text-gray-800"}`}
                >
                  <option value="">選択してください</option>
                  {SEMINAR_DATES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.preferredDate && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
              )}
              <p className="text-xs text-gray-400 mt-1.5">
                ※ 満席の場合は別の日程をご案内することがあります
              </p>
            </div>

            {/* Heard From */}
            <div className={errors.heardFrom ? "error-field" : ""}>
              <label className="form-label">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-sage-400" />
                  このセミナーをどこで知りましたか？
                  <span className="required-badge">必須</span>
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {HEARD_FROM_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      form.heardFrom === opt
                        ? "border-sage-400 bg-sage-50 text-sage-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-sage-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="heardFrom"
                      value={opt}
                      checked={form.heardFrom === opt}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        form.heardFrom === opt ? "border-sage-500 bg-sage-500" : "border-gray-300"
                      }`}
                    >
                      {form.heardFrom === opt && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.heardFrom && (
                <p className="text-red-500 text-xs mt-1">{errors.heardFrom}</p>
              )}
            </div>

            {/* Motivation */}
            <div>
              <label className="form-label">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-sage-400" />
                  参加のきっかけ・お悩み
                  <span className="optional-badge">任意</span>
                </span>
              </label>
              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                placeholder="例：子どもの姿勢が気になっている、スポーツのパフォーマンスを上げたいなど"
                rows={3}
                className="form-input resize-none"
              />
            </div>

            {/* Agreement */}
            <div className={`bg-gray-50 rounded-2xl p-4 ${errors.agreement ? "error-field ring-1 ring-red-300" : ""}`}>
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    name="agreement"
                    id="agreement"
                    checked={form.agreement}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="agreement"
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                      form.agreement
                        ? "bg-sage-500 border-sage-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {form.agreement && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                </div>
                <label htmlFor="agreement" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                  <span className="font-semibold text-gray-800">個人情報の取り扱い</span>
                  に同意します。
                  <br />
                  <span className="text-xs text-gray-400">
                    ご入力いただいた情報はセミナーの運営・ご連絡のみに使用し、第三者への提供はいたしません。
                  </span>
                </label>
              </div>
              {errors.agreement && (
                <p className="text-red-500 text-xs mt-2 ml-9">{errors.agreement}</p>
              )}
            </div>

            {/* Security badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                SSL暗号化通信
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                個人情報保護
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${
                submitting
                  ? "bg-gray-300 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-peach-500 to-peach-400 hover:from-peach-600 hover:to-peach-500 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  送信中...
                </>
              ) : (
                <>
                  無料セミナーに申し込む
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400">
              ※ 送信後、確認メールが自動送信されます
            </p>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
          <h3 className="font-bold text-sage-700 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            セミナー詳細
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="text-gray-400 w-16 flex-shrink-0">開催場所</dt>
              <dd className="text-gray-700">大阪府大阪市北区〇〇町X-X（詳細はご予約後にご案内）</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-gray-400 w-16 flex-shrink-0">対象</dt>
              <dd className="text-gray-700">4歳〜小学6年生のお子さんと保護者の方</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-gray-400 w-16 flex-shrink-0">持ち物</dt>
              <dd className="text-gray-700">動きやすい服装・飲み物（タオルあると便利）</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-gray-400 w-16 flex-shrink-0">参加費</dt>
              <dd className="text-gray-700 font-semibold text-sage-600">完全無料</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400 pb-8">
          <p>© 2026 体軸体験セミナー. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
