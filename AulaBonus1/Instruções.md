Ensinando o Kubernetes  a verificar a saúde de um POD (livenessProbe)

Deve-se colocar as linhas abaixo na definição do POD no manifesto do Deploy

        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

    - O 'path' define a rota a qual a aplicação retorna um sinal de que está ok
    - O 'port', a pprta exposta pelo POD
    - 'initialDelaySeconds' é o delay antes da primeira verificação
    - 'periodSeconds' é o intervalo de checagens

    https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/


Aplicação não está pronta (alta carga)

readinessProbe: Serviço do Kubernetes que verifica a carga de trabalho de um POD
Esse serviço retira o POD do service enquanto ele não estiver pronto afim de não sobrecarrega-lo
A estrutura do readinessProbe é basicamente a mesma do livenessProbe

        readinessProbe:
          httpGet:
            path: /ready
            port: web-port
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 3

A rota de testes (/ready nesse caso), não deve ser a mesma usada para verificar a disponibilidade da aplicação (livenessProbe)

Limitação de recursos (limits)

        resources:
          limits:
            memory: "64Mi"
            cpu: "400m"

Definição da quantidade mínima de recursos 
        
        resources:
          requests:
            cpu: "200m"
            memory: "32Mi"

Com os limites configurados para os pods no Deploy, pode-se habilitar o HPA (horizontal Pod Auto-scale)
Isso da ao Kubernetes a possibilidade de escalar automaticamente as réplicas, dispensando o uso do kubectl scale
ou alterar o manifesto de deploy.
O HPA é definido em um novo manifesto. Ele verifica o consumo de recursos (cpu, memória ou personalizado, exemplo, fila de mensagens) de um Deployment e o escala


apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-conversao
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 60

  a chave targetCPUUtilizationPerentage é a porcentagem baseada no request.cpu



