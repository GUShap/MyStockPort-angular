import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { UtilsService } from '../utils/utils.service';
import { StocksService } from '../stocks/stocks.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usersDb: User[]
  private usersKey: string = 'usersDb'
  private currUserKey: string = 'user'

  private _users$ = new BehaviorSubject<User[]>([])
  public users$ = this._users$.asObservable()

  user = {
    username: 'Guy Shapira',
    password: '1234',
    id: this.utils.setId(),
    portfolio: [
      {
        symbol: 'IBM',
        amount: 127
      },
      {
        symbol: 'MSFT',
        amount: 23
      },
      {
        symbol: 'ABNB',
        amount: 42
      },
      {
        symbol: 'GH',
        amount: 22
      },
      {
        symbol: 'IGV',
        amount: 3
      }
    ],
    mvoes: [],
    imgUrl: 'https://robohash.org/re'
  }

  private _currUser$ = new BehaviorSubject<Object>(null)
  public currUser$ = this._currUser$.asObservable()

  constructor(
    private utils: UtilsService,
    private stockService: StocksService,
    private http: HttpClient) { }

  public getUser() {
    const user = this.utils.loadFromSession(this.currUserKey)
    user
      ? this._currUser$.next(user)
      : this._currUser$.next(null)
  }

  public loadUsers() {
    this._usersDb = this.utils.load(this.usersKey) || []
    if (!this._usersDb || !this._usersDb.length) {
      var tickerList$: string[];
      this.stockService.allTickers$.subscribe(res => {
        tickerList$ = res
      })
      this.http.get('https://randomuser.me/api/?results=50')
        .subscribe((res: any) => {
          res.results.forEach(user => {
            user.id = this.utils.setId()
            user.balance = this.utils.getRandomInt()
            user.imgUrl = user.picture.large
            user.portfolio = []
            tickerList$.forEach(symbol => {
              if (Math.random() > 0.96 && user.portfolio.length < 5) {
                let stock = {
                  symbol,
                  amount: this.utils.getRandomInt(10000, 10),
                  userId:user.id
                }
                user.portfolio.push(stock)
              }
            })
            delete user.picture
            this._usersDb.push(user)
          })
          this._usersDb.forEach((user: any) => {
            user.contacts = this.loadContacts(user.id)
          })
          this.utils.store(this.usersKey, this._usersDb)
        })
    }
    this._users$.next(this._usersDb)
  }

  private loadContacts(id) {
    const contacts = []
    this._usersDb.forEach(user => {
      let token = {
        id: user.id,
        name: user.name,
        imgUrl: user.imgUrl,
        login: user.login,
        portfolio: user.portfolio
      }
      if (Math.random() > 0.7 && user.id !== id) contacts.push(token)
    })

    return contacts
  }


  public login({ email, password }) {
    const user = this._usersDb.find(user => (user.email === email) && (user.login.password === password))
    if (user) {
      this.utils.storeToSession(this.currUserKey, user)
      this._currUser$.next(user)
      return user
    }
    else return null
  }

  public logout() {
    this.utils.deleteFromSession(this.currUserKey)
    this._currUser$.next(null)
  }

  public register({ username, email, password }) {
    this.http.get('https://randomuser.me/api')
      .subscribe((data: any) => {
        let user = data.results[0]
        user.id = this.utils.setId()
        user.email = email
        user.login.username = username
        user.login.password = password
        user.balance = this.utils.getRandomInt()
        user.imgUrl = user.picture.large
        user.portfolio = []
        delete user.picture

        this._usersDb.push(user)
        this.utils.store(this.usersKey, this._usersDb)
      })
    this.login({ email, password })
  }

  public demoLog() {
    const idx = this.utils.getRandomInt(0, this._usersDb.length - 1)
    const user = this._usersDb[idx]
    this.utils.storeToSession(this.currUserKey, user)
    this._currUser$.next(user)
  }

  public checkValidEmail(email) {
    if (!email.includes('@')) return false
    if (this._usersDb.some(user => user.email === email)) return false
    else return true
  }

}
