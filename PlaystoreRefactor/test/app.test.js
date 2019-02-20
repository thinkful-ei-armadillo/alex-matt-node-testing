'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');


describe('GET /apps', () => {
  it('should return an array of apps', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('content-type', /json/)
      .then(resp => {
        expect(resp.body).to.be.an('array');
      });
  });

  describe('Genre Tests:', () => {
    it('should require genre to be one of Action, Puzzle, Strategy, Casual, Arcade or Card', () => {
      return request(app)
        .get('/apps')
        .query({genre:'ERROR'})
        .expect(400, 'Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card');
    });

    it('should only return apps of the specified genre', () => {
      const queries = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
      // return queries.map((query) => {
      //   return request(app)
      //     .get('/apps')
      //     .query({query})
      //     .expect(200)
      //     .expect('content-type', /json/)
      //     .then(resp => {
      //       let i = 0;
      //       let genre = true;
      //       while(genre && i < resp.body.length) {
      //         genre = genre && resp.body[i].Genres.toLowerCase().includes(query);
      //         i++;
      //       }
      //       expect(genre).to.be.true;
      //     });
      // });
      return request(app)
        .get('/apps')
        .query({query: 'action'})
        .expect(200)
        .expect('content-type', /json/)
        .then(resp => {
          let i = 0;
          let genre = true;
          while(genre && i < resp.body.length - 1) {
            genre = genre && resp.body[i].Genres.toLowerCase().indexOf('action');
            i++;
          }
          expect(genre).to.be.true;
        });
    });
  });

  describe('Sort Tests:', () => {
    it('should require sort to be rating or app', () => {
      return request(app)
        .get('/apps')
        .query({sort:'ERROR'})
        .expect(400, 'Sort must be by rating or app name');
    });

    it('should return a sorted array by rating', () => {
      return request(app)
        .get('/apps')
        .query({sort: 'rating'})
        .expect(200)
        .expect('content-type', /json/)
        .then(resp => {
          expect(resp.body).to.be.an('array');
          let i = 0;
          let sorted = true;
          while(sorted && i < resp.body.length - 1) {
            sorted = sorted && resp.body[i].Rating <= resp.body[i+1].Rating;
            i++;
          }
          expect(sorted).to.be.true;
        });
    });

    it('should return a sorted array by app name', () => {
      return request(app)
        .get('/apps')
        .query({sort: 'app'})
        .expect(200)
        .expect('content-type', /json/)
        .then(resp => {
          expect(resp.body).to.be.an('array');
          let i = 0;
          let sorted = true;
          while(sorted && i < resp.body.length - 1) {
            sorted = sorted && resp.body[i].App.toLowerCase() < resp.body[i+1].App.toLowerCase();
            i++;
          }
          expect(sorted).to.be.true;
        });
    });
  });

});