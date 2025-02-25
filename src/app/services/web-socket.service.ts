import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { Agente } from '../agente';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client;
  private updates: Subject<Agente> = new Subject<Agente>();

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    });

    this.client.onConnect = () => {
      console.log('Conectado al WebSocket ✅');
      this.client.subscribe('/topic/agentes', (message: Message) => {
        const agenteActualizado: Agente = JSON.parse(message.body);
        this.updates.next(agenteActualizado);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Error en WebSocket ❌', frame);
    };

    this.client.activate();
  }

  getUpdates(): Observable<Agente> {
    return this.updates.asObservable();
  }

  actualizarEstadoAgente(agente: Agente): void {
    if (this.client && this.client.connected) {
      console.log('Enviando agente:', agente);
      this.client.publish({
        destination: '/app/cambiarEstado',
        body: JSON.stringify(agente),
      });
    } else {
      console.warn('Intentando reconectar al WebSocket...');
      this.client.onConnect = () => {
        this.client.subscribe('/topic/agentes', (message: Message) => {
          const agenteActualizado: Agente = JSON.parse(message.body);
          this.updates.next(agenteActualizado);
        });

        console.log('Reintentando enviar el agente:', agente);
        this.client.publish({
          destination: '/app/cambiarEstado',
          body: JSON.stringify(agente),
        });
      };
      this.client.activate();
    }
  }
}
