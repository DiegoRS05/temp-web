"use client";

import type { LegalDoc } from "./store";
import { BUSINESS } from "./data";

/* Documentos legales tipo plantilla (LSSI-CE, RGPD/LOPDGDD).
   Los campos marcados como [COMPLETAR] son datos que solo conoce el titular. */

function Fill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-gold/50 bg-gold/10 px-1.5 py-0.5 text-[0.85em] font-semibold text-gold">
      {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mt-8 text-2xl tracking-wide text-cream first:mt-0">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3.5 text-[15px] leading-relaxed text-cream/75">{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="mt-2 flex gap-2.5 text-[15px] leading-relaxed text-cream/75">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

const Holder = () => (
  <>
    <P>
      <strong className="text-cream">Titular:</strong> La Mano Negra (negocio de peluquería
      unisex) · <strong className="text-cream">NIF:</strong> <Fill>[COMPLETAR: NIF del titular]</Fill> ·{" "}
      <strong className="text-cream">Domicilio:</strong> {BUSINESS.address}, {BUSINESS.postalCode}{" "}
      {BUSINESS.city} ({BUSINESS.country}) · <strong className="text-cream">Teléfono:</strong>{" "}
      {BUSINESS.phone} · <strong className="text-cream">Correo electrónico:</strong>{" "}
      <Fill>[COMPLETAR: email de contacto]</Fill>
    </P>
  </>
);

export function AvisoLegal() {
  return (
    <div>
      <H2>1. Datos identificativos</H2>
      <P>
        En cumplimiento del deber de información de la Ley 34/2002, de 11 de julio, de
        Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE),
        se informa de los datos identificativos del titular de este sitio web:
      </P>
      <Holder />

      <H2>2. Objeto</H2>
      <P>
        Este sitio web tiene carácter informativo y promocional: presenta los servicios,
        precios, horarios y datos de contacto de La Mano Negra. La reserva de citas se
        realiza a través de la plataforma externa Booksy, cuya política de privacidad
        aplica en el momento de la reserva.
      </P>

      <H2>3. Condiciones de uso</H2>
      <ul>
        <Li>El acceso al sitio es gratuito y no exige registro.</Li>
        <Li>El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas.</Li>
        <Li>El titular podrá modificar, en cualquier momento y sin aviso previo, los contenidos del sitio.</Li>
      </ul>

      <H2>4. Propiedad intelectual e industrial</H2>
      <P>
        Todos los contenidos de este sitio (textos, fotografías, logotipo, diseño y
        código) son titularidad de La Mano Negra o de sus respectivos autores, y están
        protegidos por la normativa de propiedad intelectual e industrial. Queda
        prohibida su reproducción, distribución o transformación sin autorización
        expresa. Las fotografías del local y del equipo proceden del perfil público de
        Google Business Profile y de prensa local del negocio.
      </P>

      <H2>5. Exclusión de responsabilidad</H2>
      <P>
        El titular no se hace responsable del mal uso de los contenidos, ni de la
        disponibilidad técnica de servicios de terceros (Booksy, Google Maps, redes
        sociales) enlazados desde esta web. Las reseñas mostradas provienen de perfiles
        públicos de Google Maps y reflejan la opinión de sus autores.
      </P>

      <H2>6. Enlaces externos</H2>
      <P>
        Este sitio contiene enlaces a webs de terceros (Booksy, Instagram, Facebook,
        Google Maps). El titular no controla ni asume responsabilidad sobre sus
        contenidos o políticas de privacidad.
      </P>

      <H2>7. Legislación aplicable</H2>
      <P>
        La relación entre el titular y los usuarios se regirá por la legislación
        española. Para cualquier controversia, las partes se someterán a los juzgados y
        tribunales que correspondan conforme a Derecho.
      </P>
    </div>
  );
}

export function Privacidad() {
  return (
    <div>
      <H2>1. Responsable del tratamiento</H2>
      <Holder />

      <H2>2. Datos que tratamos y finalidades</H2>
      <ul>
        <Li>
          <strong className="text-cream">Navegación:</strong> este sitio no utiliza formularios
          ni analitica propia; no recoge datos personales de navegación en servidores del titular.
        </Li>
        <Li>
          <strong className="text-cream">Reserva de citas:</strong> al reservar en Booksy,
          los datos que introduzcas (nombre, teléfono, email) los trata Booksy como
          encargado/responsable según su propia política de privacidad. El titular los
          recibe únicamente para gestionar tu cita.
        </Li>
        <Li>
          <strong className="text-cream">Contacto directo:</strong> si llamas por teléfono o
          escribes por redes sociales, tratamos tus datos para atender tu solicitud.
        </Li>
        <Li>
          <strong className="text-cream">Consentimiento de cookies:</strong> guardamos tu
          elección en el almacenamiento local del navegador (localStorage). No contiene
          datos personales identificativos.
        </Li>
      </ul>

      <H2>3. Base jurídica</H2>
      <P>
        El tratamiento se basa en tu consentimiento (art. 6.1.a RGPD) al reservar o
        contactar, y en la aplicación de medidas precontractuales cuando solicitas una
        cita (art. 6.1.b RGPD).
      </P>

      <H2>4. Destinatarios y encargados</H2>
      <ul>
        <Li><strong className="text-cream">Booksy</strong> — gestión de citas online.</Li>
        <Li><strong className="text-cream">Google Maps</strong> — mapa del local; solo se carga si aceptas las cookies de terceros.</Li>
        <Li><strong className="text-cream">Meta (Instagram / Facebook)</strong> — solo si abres sus enlaces.</Li>
      </ul>

      <H2>5. Conservación</H2>
      <P>
        Los datos de reserva se conservan el tiempo necesario para gestionar el servicio
        y los plazos legales aplicables. La elección de cookies se conserva hasta que la
        borres del navegador o cambies tu decisión.
      </P>

      <H2>6. Tus derechos</H2>
      <P>
        Puedes ejercer los derechos de acceso, rectificación, supresión, oposición,
        limitación y portabilidad escribiendo a <Fill>[COMPLETAR: email de contacto]</Fill>.
        También puedes reclamar ante la Agencia Española de Protección de Datos
        (www.aepd.es).
      </P>

      <H2>7. Seguridad</H2>
      <P>
        Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos.
        Al tratarse de un sitio estático, la superficie de tratamiento es mínima.
      </P>
    </div>
  );
}

export function Cookies() {
  return (
    <div>
      <H2>1. Qué son las cookies</H2>
      <P>
        Las cookies y tecnologías similares (como el almacenamiento local) son pequeños
        archivos que se guardan en tu dispositivo al visitar una web y que permiten
        recordar información sobre tu visita.
      </P>

      <H2>2. Qué usa esta web</H2>
      <ul>
        <Li>
          <strong className="text-cream">Almacenamiento local propio (necesario):</strong>{" "}
          guardamos únicamente tu decisión sobre las cookies para no preguntarte en cada
          visita. No hay analítica, ni rastreo, ni publicidad.
        </Li>
        <Li>
          <strong className="text-cream">Google Maps (terceros, condicionado):</strong> el
          mapa del local se carga <em>solo</em> si pulsas aceptar. Si lo haces, Google
          podrá instalar sus cookies y aplicar su política de privacidad. Si rechazas,
          el mapa no se carga y verás una imagen estática en su lugar.
        </Li>
      </ul>

      <table className="mt-5 w-full overflow-hidden rounded-xl border border-white/10 text-left text-[13px]">
        <thead className="bg-white/[0.05] text-cream">
          <tr>
            <th className="px-3.5 py-2.5 font-semibold">Servicio</th>
            <th className="px-3.5 py-2.5 font-semibold">Tipo</th>
            <th className="px-3.5 py-2.5 font-semibold">Finalidad</th>
            <th className="px-3.5 py-2.5 font-semibold">Activación</th>
          </tr>
        </thead>
        <tbody className="text-cream/70">
          <tr className="border-t border-white/10">
            <td className="px-3.5 py-2.5">lmn-consent (localStorage)</td>
            <td className="px-3.5 py-2.5">Necesario</td>
            <td className="px-3.5 py-2.5">Recordar tu elección de privacidad</td>
            <td className="px-3.5 py-2.5">Siempre</td>
          </tr>
          <tr className="border-t border-white/10">
            <td className="px-3.5 py-2.5">Google Maps</td>
            <td className="px-3.5 py-2.5">Terceros</td>
            <td className="px-3.5 py-2.5">Mostrar el mapa del local</td>
            <td className="px-3.5 py-2.5">Solo si aceptas</td>
          </tr>
        </tbody>
      </table>

      <H2>3. Cómo cambiar tu decisión</H2>
      <P>
        Puedes aceptar, rechazar o reconfigurar el uso del mapa en cualquier momento
        desde el botón «Gestionar cookies» del pie de página o desde el propio mapa.
        Además, puedes borrar o bloquear cookies desde la configuración de tu navegador
        (Chrome, Firefox, Safari, Edge), en los apartados de privacidad.
      </P>

      <H2>4. Más información</H2>
      <P>
        Para saber cómo tratamos los datos en general, consulta la Política de
        Privacidad. Si tienes dudas, escríbenos a <Fill>[COMPLETAR: email de contacto]</Fill>.
      </P>
    </div>
  );
}

export const LEGAL_META: Record<Exclude<LegalDoc, null>, { title: string; updated: string; render: () => React.ReactNode }> = {
  aviso: { title: "Aviso legal", updated: "Actualizado: octubre 2026", render: () => <AvisoLegal /> },
  privacidad: { title: "Política de privacidad", updated: "Actualizado: octubre 2026", render: () => <Privacidad /> },
  cookies: { title: "Política de cookies", updated: "Actualizado: octubre 2026", render: () => <Cookies /> },
};
