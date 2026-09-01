"use client";

import { Eye, EyeOff, LoaderCircle, LockKeyhole, LogIn, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

const ADMIN_EMAIL = "theplacepublicidade@gmail.com";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ADMIN_EMAIL, password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Não foi possível entrar.");
      window.location.assign("/admin");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível entrar.");
      setSubmitting(false);
    }
  };

  return (
    <form className="admin-login-card" onSubmit={submit}>
      <span className="admin-login-icon"><LockKeyhole /></span>
      <small>Painel administrativo</small>
      <h1>Entre na Central</h1>
      <p>Adicione arquivos e organize os materiais por região.</p>

      <label>
        <span>E-mail</span>
        <div className="admin-login-field"><Mail /><input type="email" value={ADMIN_EMAIL} readOnly aria-readonly="true" /></div>
      </label>
      <label>
        <span>Senha</span>
        <div className="admin-login-field">
          <LockKeyhole />
          <input
            autoFocus
            required
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua senha"
          />
          <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </label>

      {error ? <div className="admin-login-error" role="alert">{error}</div> : null}
      <button className="admin-login-submit" type="submit" disabled={submitting || !password}>
        {submitting ? <LoaderCircle className="spin" /> : <LogIn />}
        {submitting ? "Entrando..." : "Entrar no painel"}
      </button>
      <a href="/">Voltar para a Central</a>
    </form>
  );
}
