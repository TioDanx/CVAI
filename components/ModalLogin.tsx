'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/AuthContext'

type FormData = { email: string; password: string }

export default function ModalLogin({ onClose }: { onClose: () => void }) {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => emailRef.current?.focus(), 0)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey) }
  }, [onClose])

  useEffect(() => {
    const root = dialogRef.current
    if (!root) return
    const sel = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
    const focusables = Array.from(root.querySelectorAll<HTMLElement>(sel))
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !focusables.length) return
      const first = focusables[0], last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault() }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault() }
    }
    root.addEventListener('keydown', onKeyDown)
    return () => root.removeEventListener('keydown', onKeyDown)
  }, [mounted])

  const prettyError = useMemo(() => {
    if (!error) return null
    if (error.includes('auth/invalid-credential')) return 'Email o contraseña incorrectos.'
    if (error.includes('auth/email-already-in-use')) return 'Ese email ya está registrado.'
    if (error.includes('auth/weak-password')) return 'La contraseña es muy débil (mínimo 6 caracteres).'
    return error
  }, [error])

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true); setError(null)
      if (isRegistering) await registerWithEmail(data.email, data.password)
      else await loginWithEmail(data.email, data.password)
      reset(); onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido')
    } finally { setIsLoading(false) }
  }

  const overlay = (
    <div
      className={`fixed inset-0 z-[100] flex justify-center md:items-center items-start p-4 md:p-6
                  bg-black/50 transition-opacity duration-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog" aria-modal="true" aria-labelledby="auth-title" ref={dialogRef}
        className={`relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl outline-none
                    transition-transform duration-200 ${mounted ? 'scale-100' : 'scale-95'}
                    max-h-[85svh] overflow-auto md:my-0 my-8`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full
                     text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Cerrar"
        >×</button>

        <h2 id="auth-title" className="text-xl font-semibold tracking-tight text-gray-900">
          {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {isRegistering ? 'Registrate para guardar tu perfil y generar CVs personalizados.'
                         : 'Accedé para continuar con tu perfil y tus CVs.'}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">Correo</label>
            <input
              {...register('email', { required: 'El correo es obligatorio.', pattern: { value: /\S+@\S+\.\S+/, message: 'Ingresá un correo válido.' } })}
              ref={(el) => {register('email').ref?.(el); emailRef.current = el as HTMLInputElement | null }}
              type="email" inputMode="email" autoComplete="email" placeholder="tu@email.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400
                         focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {errors.email?.message && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">Contraseña</label>
            <div className="relative">
              <input
                {...register('password', { required: 'La contraseña es obligatoria.', minLength: { value: 6, message: 'Mínimo 6 caracteres.' } })}
                type={showPassword ? 'text' : 'password'} autoComplete={isRegistering ? 'new-password' : 'current-password'}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 text-sm text-gray-900 placeholder-gray-400
                           focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button" onClick={() => setShowPassword(v => !v)}
                className="absolute inset-y-0 right-0 my-1 mr-1 inline-flex items-center rounded-md px-2 text-xs
                           text-gray-600 hover:bg-gray-100"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {errors.password?.message && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          {prettyError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">{prettyError}</div>
          )}

          <button
            type="submit" disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2
                       text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {isLoading ? (<span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" /><path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
              Procesando…
            </span>) : (isRegistering ? 'Registrarse' : 'Entrar')}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs uppercase text-gray-500">o</span>
          <div className="h-px flex-1 bg-gray-2 00" />
        </div>

        <button
          onClick={async () => {
            try { setIsLoading(true); setError(null); await loginWithGoogle(); onClose() }
            catch (err: unknown) { setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión con Google.') }
            finally { setIsLoading(false) }
          }}
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm
                     font-semibold text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-60
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-1.7 3.6-5.5 3.6-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 4 1.5l2.7-2.6C16.8 2.8 14.6 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c7 0 9.7-4.9 9.7-7.4 0-.5-.1-1-.2-1.4H12z"/></svg>
          Continuar con Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegistering ? '¿Ya tenés cuenta?' : '¿No tenés cuenta?'}{' '}
          <button
            onClick={() => { setIsRegistering(v => !v); setError(null); reset(); setTimeout(() => emailRef.current?.focus(), 0) }}
            className="font-semibold text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isRegistering ? 'Iniciar sesión' : 'Registrate'}
          </button>
        </p>

        <p className="mt-3 text-center text-xs text-gray-500">
          Al continuar aceptás nuestros <a href="/terms" className="underline">Términos</a> y <a href="/privacy" className="underline">Política de Privacidad</a>.
        </p>
      </div>
    </div>
  )

  return mounted ? createPortal(overlay, document.body) : null
}
